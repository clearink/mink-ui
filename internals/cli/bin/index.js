#!/usr/bin/env node
'use strict';

var commander = require('commander');
var fse = require('fs-extra');
var nanospinner = require('nanospinner');
var chalk = require('chalk');
var glob = require('fast-glob');
var rollup = require('rollup');
var babel = require('@rollup/plugin-babel');
var commonjs = require('@rollup/plugin-commonjs');
var resolve = require('@rollup/plugin-node-resolve');
var node_child_process = require('node:child_process');
var fs = require('node:fs');
var path = require('node:path');
var slash = require('slash');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('postcss');
var sass = require('sass');
var fastXmlParser = require('fast-xml-parser');
var svgo = require('svgo');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fse__default = /*#__PURE__*/_interopDefault(fse);
var chalk__default = /*#__PURE__*/_interopDefault(chalk);
var glob__default = /*#__PURE__*/_interopDefault(glob);
var babel__default = /*#__PURE__*/_interopDefault(babel);
var commonjs__default = /*#__PURE__*/_interopDefault(commonjs);
var resolve__default = /*#__PURE__*/_interopDefault(resolve);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);
var slash__default = /*#__PURE__*/_interopDefault(slash);
var autoprefixer__default = /*#__PURE__*/_interopDefault(autoprefixer);
var cssnano__default = /*#__PURE__*/_interopDefault(cssnano);
var postcss__default = /*#__PURE__*/_interopDefault(postcss);
var sass__default = /*#__PURE__*/_interopDefault(sass);

const colors = {
  error: text => chalk__default.default.hex('#e74c3c')(text),
  info: text => chalk__default.default.hex('#3498db')(text),
  success: text => chalk__default.default.hex('#2ecc71')(text),
  warning: text => chalk__default.default.hex('#f39c12')(text)
};

async function action(command, cwd) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const child = node_child_process.spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });
    const onCleanup = () => {
      child.kill('SIGHUP');
    };
    process.on('exit', onCleanup);
    child.on('close', code => {
      process.removeListener('exit', onCleanup);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
      }
    });
  });
}

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

async function formatJson(filePath) {
  return fse__default.default.readJson(filePath).then(json => {
    const {
      dependencies = {},
      peerDependencies = {}
    } = json;
    return {
      pkgJson: json,
      dependencies: Object.keys(dependencies),
      peerDependencies: Object.keys(peerDependencies)
    };
  });
}

const {
  isArray
} = Array;

function isNullish(obj) {
  return obj == null;
}

function toArray(value, strict = false) {
  if (isArray(value)) return value;
  return isNullish(value) || strict ? [] : [value];
}

function isObject(obj) {
  return obj != null && typeof obj === 'object';
}

const _toString = Object.prototype.toString;
const rawType = o => _toString.call(o).slice(8, -1);

function isString(obj) {
  return rawType(obj) === 'String';
}

function capitalize(str) {
  if (!isString(str)) return str;
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function removeExtname(file) {
  return file.slice(0, -path__default.default.extname(file).length);
}
async function ensureWriteFile(filePath, data) {
  await fse__default.default.ensureFile(filePath);
  return fse__default.default.writeFile(filePath, data, {
    encoding: 'utf-8'
  });
}
async function collectEntries() {
  const {
    src,
    ignoreFiles
  } = constants;
  const globOptions = {
    cwd: src,
    ignore: ignoreFiles.concat('**/style')
  };
  const relatives = await glob__default.default.async('**/*.ts{,x}', globOptions);
  return relatives.reduce((entries, relative) => {
    entries[removeExtname(relative)] = path__default.default.resolve(src, relative);
    return entries;
  }, {});
}

async function transform() {
  const jsonFilePath = constants.resolveCwd('./package.json');
  const {
    dependencies,
    peerDependencies
  } = await formatJson(jsonFilePath);
  const entries = await collectEntries();
  await rollup.rollup({
    external: [...dependencies, ...peerDependencies, /node_modules/],
    input: entries,
    treeshake: false,
    plugins: [resolve__default.default({
      extensions: constants.jsExtensions
    }), commonjs__default.default(), babel__default.default(constants.babelOptions)]
  }).then(bundle => {
    return Promise.all([bundle.write({
      dir: constants.esm,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true
    }), bundle.write({
      dir: constants.cjs,
      format: 'cjs',
      entryFileNames: '[name].js',
      preserveModules: true,
      exports: 'named'
    })]);
  });
}
async function dts() {
  const {
    cwd,
    esm,
    ignoreFiles,
    resolveEsm,
    resolveCjs
  } = constants;
  await action(`tsc --build ./tsconfig.build.json`, cwd);
  const globOptions = {
    cwd: esm,
    ignore: ignoreFiles
  };
  const files = await glob__default.default.async('**/*.d.ts', globOptions);
  const promises = files.map(file => fse__default.default.copy(resolveEsm(file), resolveCjs(file)));
  await Promise.all(promises);
}
async function subpath(options) {
  const {
    formatSubName
  } = options;
  const {
    src,
    ignoreFiles,
    resolveCwd
  } = constants;
  const filePath = resolveCwd('./package.json');
  const {
    pkgJson: json
  } = await formatJson(filePath);
  json.exports = {
    './package.json': './package.json'
  };
  const globOptions = {
    cwd: src,
    ignore: ignoreFiles
  };
  const results = await glob__default.default.async('**/*.ts{,x}', globOptions);
  const entries = results.reduce((result, file) => {
    const subName = formatSubName(file);
    if (!subName) return result;
    const target = `./src/${file}`;
    result.push([subName, {
      types: target,
      import: target,
      require: target
    }]);
    return result;
  }, []).sort((a, b) => a[0].localeCompare(b[0]));
  json.exports = {
    ...json.exports,
    ...Object.fromEntries(entries)
  };
  await ensureWriteFile(filePath, `${JSON.stringify(json, null, 2)}\n`);
}

async function copyFiles() {
  const root = constants.src;
  const globalOptions = {
    cwd: root,
    ignore: constants.ignoreFiles
  };
  const results = await glob__default.default.async('**/*.{sc,sa,c}ss', globalOptions);
  const promises = results.map(file => {
    const filePath = path__default.default.resolve(root, file);
    return Promise.all([fse__default.default.copy(filePath, constants.resolveEsm(file)), fse__default.default.copy(filePath, constants.resolveCjs(file))]);
  });
  return Promise.all(promises);
}
async function transformFiles() {
  const root = constants.src;
  const globalOptions = {
    cwd: root,
    ignore: constants.ignoreFiles
  };
  const files = await glob__default.default.async(['**/style/index.{sc,sa,c}ss', 'styles/builtin.scss'], globalOptions);
  const promises = files.map(async file => {
    const fileName = removeExtname(file);
    const filePath = path__default.default.resolve(root, file);
    const res = await sass__default.default.compileAsync(filePath);
    return Promise.all([ensureWriteFile(constants.resolveEsm(`${fileName}.css`), res.css), ensureWriteFile(constants.resolveCjs(`${fileName}.css`), res.css)]);
  });
  return Promise.all(promises);
}
async function transformFullFiles() {
  const fileName = constants.fullCssFileName;
  const filePath = constants.resolveSrc('styles/components.scss');
  const sassResult = await sass__default.default.compileAsync(filePath);
  return Promise.all([postcss__default.default([autoprefixer__default.default()]).process(sassResult.css, {
    from: filePath
  }).then(res => ensureWriteFile(constants.resolveUmd(`${fileName}.css`), res.css)), postcss__default.default([autoprefixer__default.default(), cssnano__default.default({
    preset: 'default'
  })]).process(sassResult.css, {
    from: filePath
  }).then(res => ensureWriteFile(constants.resolveUmd(`${fileName}.min.css`), res.css))]);
}
async function generateFiles() {
  const root = constants.src;
  const globalOptions = {
    cwd: root,
    ignore: constants.ignoreFiles
  };
  const files = await glob__default.default.async('**/style/index.ts{,x}', globalOptions);
  const promises = files.map(async file => {
    const fileName = removeExtname(file);
    const filePath = path__default.default.resolve(root, file);
    const fileContent = await fse__default.default.readFile(filePath, {
      encoding: 'utf-8'
    });
    const re = /(\s*import\s+['"][^'"]*)\.(sass|scss|css)(['"])\s*/g;
    const sourceText = fileContent.replace(re, (_, p1, __, p3) => `${p1}.css${p3}`);
    const targetDir = path__default.default.dirname(fileName);
    return Promise.all([ensureWriteFile(constants.resolveEsm(targetDir, 'css.js'), sourceText), ensureWriteFile(constants.resolveCjs(targetDir, 'css.js'), sourceText)]);
  });
  return Promise.all(promises);
}
async function css() {
  await Promise.all([copyFiles(), transformFiles(), transformFullFiles(), generateFiles()]);
}

async function bundle$2() {
  const start = performance.now();
  const spinner = nanospinner.createSpinner(`core components build starting`).start();
  await Promise.all([constants.esm, constants.cjs].map(f => fse.remove(f)));
  await Promise.all([transform(), dts(), css()]);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`core components build completed! (${time})`);
}

function toBase64(source) {
  const size = 50;
  const newSource = source.replace(/<svg(.*?)>/g, `<svg$1 width="${size}" height="${size}" fill="#cacaca">`).replace(/#333/g, '#1677ff').replace(/#E6E6E6/gi, '#e6f4ff');
  return svgo.optimize(newSource, {
    datauri: 'base64'
  }).data;
}
function clearIcon(source) {
  return svgo.optimize(source, {
    floatPrecision: 2,
    plugins: [{
      name: 'cleanupAttrs'
    }, {
      name: 'removeDoctype'
    }, {
      name: 'removeXMLProcInst'
    }, {
      name: 'removeXMLNS'
    }, {
      name: 'removeComments'
    }, {
      name: 'removeMetadata'
    }, {
      name: 'removeTitle'
    }, {
      name: 'removeDesc'
    }, {
      name: 'removeUselessDefs'
    }, {
      name: 'removeEditorsNSData'
    }, {
      name: 'removeEmptyAttrs'
    }, {
      name: 'removeHiddenElems'
    }, {
      name: 'removeEmptyText'
    }, {
      name: 'removeEmptyContainers'
    }, {
      name: 'removeViewBox'
    }, {
      name: 'cleanupEnableBackground'
    }, {
      name: 'convertStyleToAttrs'
    }, {
      name: 'convertColors'
    }, {
      name: 'convertPathData'
    }, {
      name: 'convertTransform'
    }, {
      name: 'removeUnknownsAndDefaults'
    }, {
      name: 'removeNonInheritableGroupAttrs'
    }, {
      name: 'removeUselessStrokeAndFill'
    }, {
      name: 'removeUnusedNS'
    }, {
      name: 'cleanupIds'
    }, {
      name: 'cleanupNumericValues'
    }, {
      name: 'moveElemsAttrsToGroup'
    }, {
      name: 'moveGroupAttrsToElems'
    }, {
      name: 'collapseGroups'
    }, {
      name: 'removeRasterImages'
    }, {
      name: 'mergePaths'
    }, {
      name: 'convertShapeToPath'
    }, {
      name: 'sortAttrs'
    }, {
      name: 'removeDimensions'
    }, {
      name: 'removeAttrs',
      params: {
        attrs: ['class', 'viewBox']
      }
    }]
  });
}
function xmlToJsx(nodes, level) {
  if (!isArray(nodes)) return '';
  return nodes.reduce((result, node) => {
    const root = level === 0 && node.tag === 'svg';
    const text = xmlToJsx(node.children, level + 1);
    const attrs = Object.entries(node.attrs).map(([k, v]) => ` ${k}="${v}"`).join('');
    return `${result}<${node.tag}${root ? ' {...props}' : attrs}>${text}</${node.tag}>`;
  }, '');
}

function formatXmlNodeList(json, type) {
  const isCheckNode = type === 'node';
  const initialValue = isCheckNode ? [] : {};
  if (!isObject(json)) return initialValue;
  const re = new RegExp(`^${constants.iconAttrNamePrefix}`);
  return Object.entries(json).reduce((result, [key, value]) => {
    const isJsxTag = !re.test(key);
    if (!(isCheckNode || isJsxTag)) {
      result[formatXmlAttrName(key, re)] = value;
      return result;
    }
    if (isJsxTag && isArray(result)) {
      toArray(value).forEach(node => {
        result.push({
          tag: key,
          attrs: formatXmlNodeList(node, 'attr'),
          children: formatXmlNodeList(node, 'node')
        });
      });
    }
    return result;
  }, initialValue);
}
function formatXmlContent(fileContent, relativePath) {
  const kebabName = removeExtname(path__default.default.basename(relativePath));
  const iconTheme = path__default.default.dirname(relativePath);
  const iconName = formatIconName(relativePath);
  const parser = new fastXmlParser.XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: constants.iconAttrNamePrefix
  });
  const clearedJson = parser.parse(clearIcon(fileContent).data);
  const nodeList = formatXmlNodeList(clearedJson, 'node');
  const params = nodeList[0] && nodeList[0].tag === 'svg' ? nodeList[0].attrs : {};
  const formatted = `/* eslint-disable */
// @ts-nocheck
/** This file is automatically generated, please do not manually modify it */
import type { IconProps } from '../shared/_shared.props'

import withIcon from '../shared/with-icon'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

function ${iconName}(_props: IconProps) {
  ${Object.keys(params).length ? `const props = shallowMerge(_props, ${JSON.stringify(params)})` : 'const props = _props'}
  return ${xmlToJsx(nodeList, 0)}
}

/** ![${kebabName}](${toBase64(fileContent)}) */
export default withIcon(${iconName}, ${JSON.stringify({
    name: kebabName,
    theme: iconTheme
  })})
`;
  return {
    iconName,
    formatted
  };
}
function formatXmlAttrName(attribute, re) {
  const name = attribute.replace(re, '').split('-').map((str, index) => index === 0 ? str : capitalize(str)).join('');
  return name === 'class' ? 'className' : name;
}
function formatIconName(file) {
  return removeExtname(path__default.default.basename(file)).split(/-/g).concat(path__default.default.dirname(file)).map(capitalize).join('');
}

async function gen(force) {
  const source = constants.resolveCwd('./assets');
  const target = constants.resolveSrc('./icons');
  if (!force && (await fse__default.default.exists(target))) return;
  const iconEntries = [];
  const globOptions = {
    cwd: source,
    ignore: constants.ignoreFiles
  };
  const files = await glob__default.default.async('**/*.svg', globOptions);
  const promises = files.map(async relativePath => {
    const sourcePath = path__default.default.resolve(source, relativePath);
    const fileContent = await fse__default.default.readFile(sourcePath, {
      encoding: 'utf8'
    });
    const {
      iconName,
      formatted
    } = formatXmlContent(fileContent, relativePath);
    iconEntries.push(`export { default as ${iconName} } from './${iconName}'`);
    return ensureWriteFile(path__default.default.resolve(target, `${iconName}.tsx`), formatted);
  });
  await Promise.all(promises);
  const content = `/* eslint-disable */\n\n${iconEntries.join('\n')}`;
  await ensureWriteFile(path__default.default.resolve(target, 'index.tsx'), content);
}

async function bundle$1() {
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting build icons').start();
  await Promise.all([constants.esm, constants.cjs].map(f => fse.remove(f)));
  await gen(false);
  await Promise.all([transform(), dts()]);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`build icons completed! (${time})`);
}
async function generate() {
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting generate icons').start();
  await fse.remove(constants.resolveSrc('icons'));
  await gen(true);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`generate icons completed! (${time})`);
}
async function sub$1() {
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting generate icons subpath import').start();
  await subpath({
    formatSubName: file => {
      const subName = removeExtname(file);
      if (subName === 'index') return '.';
      if (subName === 'shared/_shared.context') return './IconConfigContext';
      if (subName === 'shared/icon-font') return './IconFont';
      if (subName === 'icons/index' || !subName.startsWith('icons')) return false;
      return `./${subName.replace(/^icons\//, '')}`;
    }
  });
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`generate icons subpath import completed! (${time})`);
}

async function bundle() {
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting build icons').start();
  await Promise.all([constants.esm, constants.cjs].map(f => fse.remove(f)));
  await Promise.all([transform(), dts()]);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`build icons completed! (${time})`);
}
async function sub() {
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting generate shared subpath import').start();
  await subpath({
    formatSubName: file => {
      const subName = removeExtname(file);
      return subName === 'index' ? '.' : `./${subName}`;
    }
  });
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`generate shared subpath import completed! (${time})`);
}

const program = new commander.Command().name('mink cli').description('用于编译/打包 mink-ui 组件库的脚本文件').version('0.0.1');
program.command('build:core').description('build mink-ui core components').action(bundle$2);
program.command('build:icons').description('build mink-ui icon components').action(bundle$1);
program.command('gen:icons').description('generate icons from svg source files').action(generate);
program.command('sub:icons').description('generate icons subpath import').action(sub$1);
program.command('build:shared').description('build shared library').action(bundle);
program.command('sub:shared').description('generate shared subpath import').action(sub);
program.parse(process.argv);
