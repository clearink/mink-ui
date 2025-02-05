import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import slash from 'slash'

class Constant {
  public add<R extends object>(fn: (constant: this) => R) {
    return Object.assign(this, Object.freeze(fn(this)))
  }
}

export const constants = new Constant()
  .add(() => ({
    _filename: slash(fileURLToPath(import.meta.url)),
  }))
  .add(instance => ({
    _dirname: slash(path.dirname(instance._filename)),
  }))
  .add(instance => ({
    cwd: slash(fs.realpathSync(process.cwd())),
    root: slash(path.resolve(instance._dirname, '../../')),
  }))
  .add(instance => ({
    resolveCwd: (...args: string[]) => slash(path.resolve(instance.cwd, ...args)),
    resolveRoot: (...args: string[]) => slash(path.resolve(instance.root, ...args)),
  }))
  .add(instance => ({
    resolveEsm: instance.resolveCwd.bind(null, 'esm'),
    resolveCjs: instance.resolveCwd.bind(null, 'lib'),
    resolveUmd: instance.resolveCwd.bind(null, 'dist'),
    resolveSrc: instance.resolveCwd.bind(null, 'src'),

    resolveCore: instance.resolveRoot.bind(null, 'packages', 'core'),
    resolveIcons: instance.resolveRoot.bind(null, 'packages', 'icons'),
    resolveEmator: instance.resolveRoot.bind(null, 'packages', 'emator'),
    resolveShared: instance.resolveRoot.bind(null, 'packages', 'shared'),
  }))
  .add(instance => ({
    esm: instance.resolveEsm('.'),
    cjs: instance.resolveCjs('.'),
    umd: instance.resolveUmd('.'),
    src: instance.resolveSrc('.'),

    core: instance.resolveCore('.'),
    icons: instance.resolveIcons('.'),
    emator: instance.resolveEmator('.'),
    shared: instance.resolveShared('.'),
  }))
  .add(() => ({
    browserslist: ['> 0.5%', 'last 2 versions', 'not dead'],
    cssExtensions: ['.scss', '.sass', '.css'],
    ignoreFiles: ['**/__tests__', '**/__docs__'],
    jsExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.mts'],
    iconAttrNamePrefix: '__#icon#__',
    fullCssFileName: 'mink-ui',
  }))
  .add(instance => ({
    babelOptions: {
      babelHelpers: 'runtime' as const,
      babelrc: false,
      extensions: instance.jsExtensions,
      plugins: ['@babel/plugin-transform-runtime'],
      presets: [
        ['@babel/preset-env', { targets: instance.browserslist }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    },
    replaces: {
      'preventAssignment': true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  }))
