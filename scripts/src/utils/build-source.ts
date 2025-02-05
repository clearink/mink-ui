import type { RollupReplaceOptions } from '@rollup/plugin-replace'

import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import { rollup } from 'rollup'

import type { BuiltinTypescriptCodeItem } from '../interface'

import { constants } from './constants'
import { getBuiltinEntries } from './get-builtin-sources'

export interface BuildSourceOptions {
  bundleName: string
  externals: (RegExp | string)[]
  replaces: RollupReplaceOptions
  builtins: BuiltinTypescriptCodeItem[]
}
// 打包源文件
export async function buildSource(options: BuildSourceOptions) {
  const entries = await getBuiltinEntries(options.builtins)

  const plugins = [
    resolve({ extensions: constants.jsExtensions }),
    commonjs(),
    babel(constants.babelOptions),
    alias({ entries: options.builtins }),
  ]

  await Promise.all([
    rollup({
      external: options.externals,
      input: entries,
      plugins,
      treeshake: false,
    }).then((bundle) => {
      return Promise.all([
        bundle.write({
          dir: constants.esm,
          format: 'esm',
          preserveModules: true,
        }),
        bundle.write({
          dir: constants.cjs,
          exports: 'named',
          format: 'cjs',
          preserveModules: true,
        }),
      ])
    }),
    rollup({
      external: options.externals,
      input: constants.resolveSrc('index.ts'),
      plugins: plugins.concat(replace(options.replaces)),
      treeshake: {
        propertyReadSideEffects: false,
        moduleSideEffects: false,
      },
    }).then((bundle) => {
      return Promise.all([
        bundle.write({
          dir: constants.umd,
          entryFileNames: '[name].js',
          exports: 'named',
          format: 'umd',
          name: options.bundleName,
          sourcemap: true,
          globals: name => name,
        }),
        bundle.write({
          dir: constants.umd,
          entryFileNames: '[name].min.js',
          exports: 'named',
          format: 'umd',
          name: options.bundleName,
          plugins: [terser()],
          sourcemap: true,
          globals: name => name,
        }),
      ])
    }),
  ])
}
