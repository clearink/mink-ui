import fs from 'node:fs'
import path from 'node:path'

import slash from 'slash'

class Constant {
  add<R extends object>(fn: (constant: this) => R) {
    return Object.assign(this, Object.freeze(fn(this)))
  }
}

export const constants = new Constant()
  .add(() => ({
    cwd: slash(fs.realpathSync(process.cwd())),
    root: slash(path.resolve(__dirname, '../../../')),
  }))
  .add(instance => ({
    resolve: (...args: string[]) => slash(path.resolve(...args)),
    resolveCwd: (...args: string[]) => slash(path.resolve(instance.cwd, ...args)),
    resolveRoot: (...args: string[]) => slash(path.resolve(instance.root, ...args)),
    relativeRoot: (arg: string) => slash(path.relative(instance.root, arg)),
  }))
  .add(instance => ({
    resolveEsm: instance.resolveCwd.bind(null, 'esm'),
    resolveCjs: instance.resolveCwd.bind(null, 'lib'),
    resolveUmd: instance.resolveCwd.bind(null, 'dist'),
    resolveSrc: instance.resolveCwd.bind(null, 'src'),
    resolveCore: instance.resolveRoot.bind(null, 'packages/core'),
    resolveIcons: instance.resolveRoot.bind(null, 'packages/icons'),
    resolveShared: instance.resolveRoot.bind(null, 'packages/shared'),
  }))
  .add(instance => ({
    core: instance.resolveCore(''),
    icons: instance.resolveCore(''),
    shared: instance.resolveCore(''),
    esm: instance.resolveEsm('.'),
    cjs: instance.resolveCjs('.'),
    src: instance.resolveSrc('.'),
  }))
  .add(() => ({
    browserslist: { chrome: '90', firefox: '88', safari: '14', edge: '90' },
    ignoreFiles: ['**/__tests__', '**/__docs__'],
    jsExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.mts'],
    iconAttrNamePrefix: '__#icon#__',
    fullCssFileName: 'mink-ui',
  }))
  .add(instance => ({
    babelOptions: {
      babelHelpers: 'runtime' as const,
      babelrc: false,
      exclude: /node_modules/,
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
