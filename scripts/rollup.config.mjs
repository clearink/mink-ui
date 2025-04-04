import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { createRequire } from 'node:module'
import { defineConfig } from 'rollup'

const pkg = createRequire(import.meta.url)('./package.json')

const external = [
  /node_modules/,
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  resolve({ extensions }),
  babel({
    babelrc: false,
    comments: false,
    babelHelpers: 'bundled',
    extensions,
    presets: ['@babel/preset-typescript'],
  }),
  commonjs(),
]

export default defineConfig([{
  input: './src/bin.ts',
  external,
  treeshake: 'smallest',
  plugins,
  output: [
    {
      file: 'bin/index.js',
      format: 'cjs',
    },
  ],
}, {
  input: './src/lib.ts',
  external,
  treeshake: 'smallest',
  plugins,
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
  ],
}])
