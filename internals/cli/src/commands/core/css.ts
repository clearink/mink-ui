import path from 'node:path'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import glob from 'fast-glob'
import fse from 'fs-extra'
import postcss from 'postcss'
import sass from 'sass'

import { constants } from '../../utils/constants'
import { ensureWriteFile, removeExtname } from '../../utils/helpers'

// 复制 css 文件
async function copyFiles() {
  const root = constants.src

  const globalOptions = { cwd: root, ignore: constants.ignoreFiles }

  const results = await glob.async('**/*.{sc,sa,c}ss', globalOptions)

  const promises = results.map((file) => {
    const filePath = path.resolve(root, file)
    return Promise.all([
      fse.copy(filePath, constants.resolveEsm(file)),
      fse.copy(filePath, constants.resolveCjs(file)),
    ])
  })

  return Promise.all(promises)
}

// 编译 css 文件
async function transformFiles() {
  const root = constants.src

  const globalOptions = { cwd: root, ignore: constants.ignoreFiles }

  const files = await glob.async(['**/style/index.{sc,sa,c}ss', 'styles/builtin.scss'], globalOptions)

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
async function transformFullFiles() {
  const fileName = constants.fullCssFileName

  const filePath = constants.resolveSrc('styles/components.scss')

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
async function generateFiles() {
  const root = constants.src

  const globalOptions = { cwd: root, ignore: constants.ignoreFiles }

  const files = await glob.async('**/style/index.ts{,x}', globalOptions)

  const promises = files.map(async (file) => {
    const fileName = removeExtname(file)

    const filePath = path.resolve(root, file)

    const fileContent = await fse.readFile(filePath, { encoding: 'utf-8' })

    const re = /(\s*import\s+['"][^'"]*)\.(sass|scss|css)(['"])\s*/g

    // .scss 替换成 .css
    const sourceText = fileContent.replace(re, (_, p1, __, p3) => `${p1}.css${p3}`)

    const targetDir = path.dirname(fileName)

    return Promise.all([
      ensureWriteFile(constants.resolveEsm(targetDir, 'css.js'), sourceText),
      ensureWriteFile(constants.resolveCjs(targetDir, 'css.js'), sourceText),
    ])
  })

  return Promise.all(promises)
}

export default async function css() {
  await Promise.all([
    copyFiles(),
    transformFiles(),
    transformFullFiles(),
    generateFiles(),
  ])
}
