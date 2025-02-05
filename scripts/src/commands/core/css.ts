import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import glob from 'fast-glob'
import fse from 'fs-extra'
import path from 'node:path'
import postcss from 'postcss'
import sass from 'sass'
import tsm from 'ts-morph'

import { constants, ensureWriteFile, removeExtname } from '../../utils'

// 复制源文件
async function copyScssFiles() {
  const root = constants.src

  const globalOptions = { cwd: root, ignore: constants.ignoreFiles }

  const files = await glob.async('**/*.{sc,sa,c}ss', globalOptions)

  const promises = files.map((file) => {
    const filePath = path.resolve(root, file)
    return Promise.all([
      fse.copy(filePath, constants.resolveEsm(file)),
      fse.copy(filePath, constants.resolveCjs(file)),
    ])
  })

  return Promise.all(promises)
}

// 编译css文件
async function compileScssFiles() {
  const root = constants.src

  const globalOptions = { cwd: root, ignore: constants.ignoreFiles }

  const files = await glob.async('**/style/index.{sc,sa,c}ss', globalOptions)

  const promises = files.map(async (file) => {
    const fileName = removeExtname(file)

    const filePath = path.resolve(root, file)

    const res = await sass.compileAsync(filePath)

    return Promise.all([
      ensureWriteFile(constants.resolveEsm(`${fileName}.css`), res.css),
      ensureWriteFile(constants.resolveCjs(`${fileName}.css`), res.css),
    ])
  })

  return Promise.all(promises)
}

// 编译全部组件样式
async function compileCompScssFiles() {
  const fileName = constants.fullCssFileName

  const filePath = constants.resolveSrc('style/components.scss')

  const sassResult = await sass.compileAsync(filePath)

  return Promise.all([
    postcss([autoprefixer()])
      .process(sassResult.css, { from: filePath })
      .then(res => ensureWriteFile(constants.resolveUmd(`${fileName}.css`), res.css)),
    postcss([autoprefixer(), cssnano({ preset: 'default' })])
      .process(sassResult.css, { from: filePath })
      .then(res => ensureWriteFile(constants.resolveUmd(`${fileName}.min.css`), res.css)),
  ])
}

// 生成 babel-plugin-import 文件
async function buildPluginImportFiles() {
  const project = new tsm.Project({
    compilerOptions: { allowJs: true },
    skipAddingFilesFromTsConfig: true,
  })

  const root = constants.src

  const globalOptions = { cwd: root, ignore: constants.ignoreFiles }

  const files = await glob.async('**/style/index.ts{,x}', globalOptions)

  const promises = files.map((file) => {
    const fileName = removeExtname(file)

    const filePath = path.resolve(root, file)

    const sourceFile = project.addSourceFileAtPath(filePath)

    sourceFile.getImportDeclarations().forEach((node) => {
      const text = node.getModuleSpecifierValue()

      const fileName = removeExtname(text)

      node.setModuleSpecifier(`${fileName}.css`)
    })

    const sourceText = sourceFile.getText()

    const targetDir = path.dirname(fileName)

    return Promise.all([
      ensureWriteFile(constants.resolveEsm(targetDir, 'css.js'), sourceText),
      ensureWriteFile(constants.resolveCjs(targetDir, 'css.js'), sourceText),
    ])
  })

  return Promise.all(promises)
}

export default async function buildCss() {
  await Promise.all([
    copyScssFiles(),
    compileScssFiles(),
    compileCompScssFiles(),
    buildPluginImportFiles(),
  ])
}
