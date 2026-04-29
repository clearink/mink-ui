import { createRequire } from 'node:module'

import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const pkg = createRequire(import.meta.url)('./package.json')

const externals = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  /node_modules/,
]

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({
    babelrc: false,
    comments: false,
    babelHelpers: 'inline',
    extensions,
    presets: ['@babel/preset-typescript'],
  }),
]

export default defineConfig([
  {
    input: { index: './src/bin.ts' },
    external: externals,
    treeshake: 'smallest',
    plugins,
    output: { dir: 'bin', format: 'cjs', interop: 'auto' },
  },
  {
    input: { index: './src/utils/constants.ts' },
    external: externals,
    treeshake: 'smallest',
    plugins,
    output: { dir: 'lib', format: 'cjs', interop: 'auto' },
  },
  {
    input: { dts: './src/dts.ts' },
    external: externals,
    treeshake: 'smallest',
    plugins,
    output: { dir: 'bin', format: 'cjs', interop: 'auto' },
  },
])
