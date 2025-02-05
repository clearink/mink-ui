import type { ExternalOption } from 'rollup'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import { rollup } from 'rollup'

import { constants } from './constants'
import { getBuiltinEntries } from './get-builtin-sources'

export interface BuildModulesOptions {
  external: ExternalOption
}
export async function compileToModules(options: BuildModulesOptions) {
  const { external } = options

  const entries = await getBuiltinEntries()

  await rollup({
    external,
    input: entries,
    plugins: [
      resolve({ extensions: constants.jsExtensions }),
      commonjs(),
      babel(constants.babelOptions),
    ],
    treeshake: false,
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
        entryFileNames: '[name].mjs',
        preserveModules: true,
        exports: 'named',
      }),
    ])
  })
}

export interface BuildBundlesOptions {
  external: ExternalOption
  bundleName: string
  globals: Record<string, string>
}

export async function compileToBundles(options: BuildBundlesOptions) {
  const { external, bundleName, globals } = options

  await rollup({
    external,
    input: constants.resolveSrc('index.ts'),
    plugins: [
      resolve({ extensions: constants.jsExtensions }),
      commonjs(),
      babel(constants.babelOptions),
      replace(constants.replaces),
    ],
    treeshake: true,
  }).then((bundle) => {
    return Promise.all([
      bundle.write({
        dir: constants.umd,
        format: 'umd',
        entryFileNames: '[name].js',
        exports: 'named',
        name: bundleName,
        sourcemap: true,
        globals,
      }),
      bundle.write({
        dir: constants.umd,
        format: 'umd',
        entryFileNames: '[name].min.js',
        exports: 'named',
        name: bundleName,
        plugins: [terser()],
        sourcemap: true,
        globals,
      }),
    ])
  })
}
