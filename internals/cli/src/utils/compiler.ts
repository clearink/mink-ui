import type { SubpathExposeOptions } from '../interface'

import glob from 'fast-glob'
import fse from 'fs-extra'
import { rollup } from 'rollup'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

import { action } from './action'
import { constants } from './constants'
import { formatJson } from './format'
import { collectEntries, ensureWriteFile } from './helpers'

/**
 * @description 编译成 js 文件
 */
export async function transform() {
  const jsonFilePath = constants.resolveCwd('./package.json')

  const { dependencies, peerDependencies } = await formatJson(jsonFilePath)

  const entries = await collectEntries()

  await rollup({
    external: [...dependencies, ...peerDependencies, /node_modules/],
    input: entries,
    treeshake: false,
    plugins: [
      resolve({ extensions: constants.jsExtensions }),
      commonjs(),
      babel(constants.babelOptions),
    ],
  }).then((bundle) => {
    return Promise.all([
      bundle.write({
        dir: constants.esm,
        format: 'esm',
        entryFileNames: '[name].mjs',
        preserveModules: true,
      }),
      bundle.write({
        dir: constants.cjs,
        format: 'cjs',
        entryFileNames: '[name].js',
        preserveModules: true,
        exports: 'named',
      }),
    ])
  })
}

/**
 * @description 生成 .d.ts 文件
 */
export async function dts() {
  const { cwd, esm, ignoreFiles, resolveEsm, resolveCjs } = constants

  await action(`tsc --build ./tsconfig.build.json`, cwd)

  const globOptions = { cwd: esm, ignore: ignoreFiles }

  const files = await glob.async('**/*.d.ts', globOptions)

  const promises = files.map(file => fse.copy(resolveEsm(file), resolveCjs(file)))

  await Promise.all(promises)
}

/**
 * @description 生成 package.json exports 声明
 */
export async function subpath(options: SubpathExposeOptions) {
  const { formatSubName } = options
  const { src, ignoreFiles, resolveCwd } = constants

  const filePath = resolveCwd('./package.json')

  const { pkgJson: json } = await formatJson(filePath)

  json.exports = { './package.json': './package.json' }

  const globOptions = { cwd: src, ignore: ignoreFiles }

  const results = await glob.async('**/*.ts{,x}', globOptions)

  const entries = results.reduce((result, file) => {
    const subName = formatSubName(file)

    if (!subName) return result

    const target = `./src/${file}`

    result.push([subName, { types: target, import: target, require: target }])

    return result
  }, [] as [string, any][]).sort((a, b) => a[0].localeCompare(b[0]))

  json.exports = { ...json.exports, ...Object.fromEntries(entries) }

  await ensureWriteFile(filePath, `${JSON.stringify(json, null, 2)}\n`)
}
