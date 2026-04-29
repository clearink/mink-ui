'use strict';

var fs = require('node:fs');
var path = require('node:path');
var slash = require('slash');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);
var slash__default = /*#__PURE__*/_interopDefault(slash);

class Constant {
  add(fn) {
    return Object.assign(this, Object.freeze(fn(this)));
  }
}
const constants = new Constant().add(() => ({
  cwd: slash__default.default(fs__default.default.realpathSync(process.cwd())),
  root: slash__default.default(path__default.default.resolve(__dirname, '../../../'))
})).add(instance => ({
  resolve: (...args) => slash__default.default(path__default.default.resolve(...args)),
  resolveCwd: (...args) => slash__default.default(path__default.default.resolve(instance.cwd, ...args)),
  resolveRoot: (...args) => slash__default.default(path__default.default.resolve(instance.root, ...args)),
  relativeRoot: arg => slash__default.default(path__default.default.relative(instance.root, arg))
})).add(instance => ({
  resolveEsm: instance.resolveCwd.bind(null, 'esm'),
  resolveCjs: instance.resolveCwd.bind(null, 'lib'),
  resolveUmd: instance.resolveCwd.bind(null, 'dist'),
  resolveSrc: instance.resolveCwd.bind(null, 'src'),
  resolveCore: instance.resolveRoot.bind(null, 'packages/core'),
  resolveIcons: instance.resolveRoot.bind(null, 'packages/icons'),
  resolveShared: instance.resolveRoot.bind(null, 'packages/shared')
})).add(instance => ({
  core: instance.resolveCore(''),
  icons: instance.resolveCore(''),
  shared: instance.resolveCore(''),
  esm: instance.resolveEsm('.'),
  cjs: instance.resolveCjs('.'),
  src: instance.resolveSrc('.')
})).add(() => ({
  browserslist: {
    chrome: '90',
    firefox: '88',
    safari: '14',
    edge: '90'
  },
  ignoreFiles: ['**/__tests__', '**/__docs__'],
  jsExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.mts'],
  iconAttrNamePrefix: '__#icon#__',
  fullCssFileName: 'mink-ui'
})).add(instance => ({
  babelOptions: {
    babelHelpers: 'runtime',
    babelrc: false,
    exclude: /node_modules/,
    extensions: instance.jsExtensions,
    plugins: ['@babel/plugin-transform-runtime'],
    presets: [['@babel/preset-env', {
      targets: instance.browserslist
    }], ['@babel/preset-react', {
      runtime: 'automatic'
    }], '@babel/preset-typescript']
  },
  replaces: {
    'preventAssignment': true,
    'process.env.NODE_ENV': JSON.stringify('production')
  }
}));

exports.constants = constants;
