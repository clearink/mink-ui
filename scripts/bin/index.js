#!/usr/bin/env node
'use strict';

var commander = require('commander');
var fse = require('fs-extra');
var nanospinner = require('nanospinner');
var chalk = require('chalk');
var fs = require('node:fs');
var path = require('node:path');
var node_url = require('node:url');
var slash = require('slash');
var babel = require('@rollup/plugin-babel');
var commonjs = require('@rollup/plugin-commonjs');
var resolve = require('@rollup/plugin-node-resolve');
var replace = require('@rollup/plugin-replace');
var terser = require('@rollup/plugin-terser');
var rollup = require('rollup');
var glob = require('fast-glob');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('postcss');
var sass = require('sass');
var tsm = require('ts-morph');
var fastXmlParser = require('fast-xml-parser');
var svgo = require('svgo');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const colors = {
  error: text => chalk.hex('#e74c3c')(text),
  info: text => chalk.hex('#3498db')(text),
  success: text => chalk.hex('#2ecc71')(text),
  warning: text => chalk.hex('#f39c12')(text)
};

class Constant {
  add(fn) {
    return Object.assign(this, Object.freeze(fn(this)));
  }
}
const constants = new Constant().add(() => ({
  _filename: slash(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('index.js', document.baseURI).href))))
})).add(instance => ({
  _dirname: slash(path.dirname(instance._filename))
})).add(instance => ({
  cwd: slash(fs.realpathSync(process.cwd())),
  root: slash(path.resolve(instance._dirname, '../../'))
})).add(instance => ({
  resolveCwd: (...args) => slash(path.resolve(instance.cwd, ...args)),
  resolveRoot: (...args) => slash(path.resolve(instance.root, ...args))
})).add(instance => ({
  resolveEsm: instance.resolveCwd.bind(null, 'esm'),
  resolveCjs: instance.resolveCwd.bind(null, 'lib'),
  resolveUmd: instance.resolveCwd.bind(null, 'dist'),
  resolveSrc: instance.resolveCwd.bind(null, 'src'),
  resolveCore: instance.resolveRoot.bind(null, 'packages', 'core'),
  resolveIcons: instance.resolveRoot.bind(null, 'packages', 'icons'),
  resolveEmator: instance.resolveRoot.bind(null, 'packages', 'emator'),
  resolveShared: instance.resolveRoot.bind(null, 'packages', 'shared')
})).add(instance => ({
  esm: instance.resolveEsm('.'),
  cjs: instance.resolveCjs('.'),
  umd: instance.resolveUmd('.'),
  src: instance.resolveSrc('.'),
  core: instance.resolveCore('.'),
  icons: instance.resolveIcons('.'),
  emator: instance.resolveEmator('.'),
  shared: instance.resolveShared('.')
})).add(() => ({
  browserslist: ['> 0.5%', 'last 2 versions', 'not dead'],
  cssExtensions: ['.scss', '.sass', '.css'],
  ignoreFiles: ['**/__tests__', '**/__docs__'],
  jsExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.mts'],
  iconAttrNamePrefix: '__#icon#__',
  fullCssFileName: 'mink-ui'
})).add(instance => ({
  babelOptions: {
    babelHelpers: 'runtime',
    babelrc: false,
    extensions: instance.jsExtensions,
    exclude: /node_modules/,
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

function removeExtname(file) {
  return file.slice(0, -path.extname(file).length);
}

function getBuiltinSources(project) {
  return glob.async('**/*.ts{,x}', {
    cwd: constants.src,
    ignore: constants.ignoreFiles
  }).then(results => {
    results.forEach(relative => {
      project.addSourceFileAtPath(constants.resolveSrc(relative));
    });
  });
}
function getBuiltinEntries() {
  return glob.async('**/*.ts{,x}', {
    cwd: constants.src,
    ignore: constants.ignoreFiles
  }).then(results => {
    return results.reduce((entries, relative) => {
      const entryName = removeExtname(relative);
      entries[entryName] = path.resolve(constants.src, relative);
      return entries;
    }, {});
  });
}

async function compileToModules(options) {
  const {
    external
  } = options;
  const entries = await getBuiltinEntries();
  await rollup.rollup({
    external,
    input: entries,
    plugins: [resolve({
      extensions: constants.jsExtensions
    }), commonjs(), babel(constants.babelOptions)],
    treeshake: false
  }).then(bundle => {
    return Promise.all([bundle.write({
      dir: constants.esm,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true
    }), bundle.write({
      dir: constants.cjs,
      format: 'cjs',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      exports: 'named'
    })]);
  });
}
async function compileToBundles(options) {
  const {
    external,
    bundleName,
    globals
  } = options;
  await rollup.rollup({
    external,
    input: constants.resolveSrc('index.ts'),
    plugins: [resolve({
      extensions: constants.jsExtensions
    }), commonjs(), babel(constants.babelOptions), replace(constants.replaces)],
    treeshake: true
  }).then(bundle => {
    return Promise.all([bundle.write({
      dir: constants.umd,
      format: 'umd',
      entryFileNames: '[name].js',
      exports: 'named',
      name: bundleName,
      sourcemap: true,
      globals
    }), bundle.write({
      dir: constants.umd,
      format: 'umd',
      entryFileNames: '[name].min.js',
      exports: 'named',
      name: bundleName,
      plugins: [terser()],
      sourcemap: true,
      globals
    })]);
  });
}

async function formatPkgJson(filePath) {
  return fse.readJson(filePath).then(json => {
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

async function buildModules$3() {
  const filePath = constants.resolveCwd('package.json');
  const {
    dependencies,
    peerDependencies
  } = await formatPkgJson(filePath);
  const external = [...dependencies, ...peerDependencies, /node_modules/, /\.(css|scss|sass)$/];
  await compileToModules({
    external
  });
}
async function buildBundles$1() {
  const filePath = constants.resolveCwd('package.json');
  const {
    pkgJson,
    peerDependencies
  } = await formatPkgJson(filePath);
  const external = [...peerDependencies, /\.(css|scss|sass)$/];
  await compileToBundles({
    external,
    bundleName: pkgJson.name,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  });
}

async function ensureWriteFile(filePath, data) {
  await fse.ensureFile(filePath);
  return fse.writeFile(filePath, data, {
    encoding: 'utf-8'
  });
}

async function copyScssFiles() {
  const root = constants.src;
  const globalOptions = {
    cwd: root,
    ignore: constants.ignoreFiles
  };
  const files = await glob.async('**/*.{sc,sa,c}ss', globalOptions);
  const promises = files.map(file => {
    const filePath = path.resolve(root, file);
    return Promise.all([fse.copy(filePath, constants.resolveEsm(file)), fse.copy(filePath, constants.resolveCjs(file))]);
  });
  return Promise.all(promises);
}
async function compileScssFiles() {
  const root = constants.src;
  const globalOptions = {
    cwd: root,
    ignore: constants.ignoreFiles
  };
  const files = await glob.async('**/style/index.{sc,sa,c}ss', globalOptions);
  const promises = files.map(async file => {
    const fileName = removeExtname(file);
    const filePath = path.resolve(root, file);
    const res = await sass.compileAsync(filePath);
    return Promise.all([ensureWriteFile(constants.resolveEsm(`${fileName}.css`), res.css), ensureWriteFile(constants.resolveCjs(`${fileName}.css`), res.css)]);
  });
  return Promise.all(promises);
}
async function compileCompScssFiles() {
  const fileName = constants.fullCssFileName;
  const filePath = constants.resolveSrc('style/components.scss');
  const sassResult = await sass.compileAsync(filePath);
  return Promise.all([postcss([autoprefixer()]).process(sassResult.css, {
    from: filePath
  }).then(res => ensureWriteFile(constants.resolveUmd(`${fileName}.css`), res.css)), postcss([autoprefixer(), cssnano({
    preset: 'default'
  })]).process(sassResult.css, {
    from: filePath
  }).then(res => ensureWriteFile(constants.resolveUmd(`${fileName}.min.css`), res.css))]);
}
async function buildPluginImportFiles() {
  const project = new tsm.Project({
    compilerOptions: {
      allowJs: true
    },
    skipAddingFilesFromTsConfig: true
  });
  const root = constants.src;
  const globalOptions = {
    cwd: root,
    ignore: constants.ignoreFiles
  };
  const files = await glob.async('**/style/index.ts{,x}', globalOptions);
  const promises = files.map(file => {
    const fileName = removeExtname(file);
    const filePath = path.resolve(root, file);
    const sourceFile = project.addSourceFileAtPath(filePath);
    sourceFile.getImportDeclarations().forEach(node => {
      const text = node.getModuleSpecifierValue();
      const fileName = removeExtname(text);
      node.setModuleSpecifier(`${fileName}.css`);
    });
    const sourceText = sourceFile.getText();
    const targetDir = path.dirname(fileName);
    return Promise.all([ensureWriteFile(constants.resolveEsm(targetDir, 'css.js'), sourceText), ensureWriteFile(constants.resolveCjs(targetDir, 'css.js'), sourceText)]);
  });
  return Promise.all(promises);
}
async function buildCss() {
  await Promise.all([copyScssFiles(), compileScssFiles(), compileCompScssFiles(), buildPluginImportFiles()]);
}

async function buildTypes() {
  const project = new tsm.Project({
    skipAddingFilesFromTsConfig: true,
    tsConfigFilePath: constants.resolveCwd('tsconfig.json'),
    compilerOptions: {
      declaration: true,
      noEmit: false,
      declarationDir: constants.esm,
      emitDeclarationOnly: true
    }
  });
  await getBuiltinSources(project);
  const diagnostics = project.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    throw new Error(project.formatDiagnosticsWithColorAndContext(diagnostics));
  }
  await Promise.all(project.getSourceFiles().map(async sourceFile => {
    await sourceFile.emit({
      emitOnlyDtsFiles: true
    });
    const filePath = sourceFile.getFilePath();
    const entryName = removeExtname(slash(path.relative(constants.src, filePath)));
    const sourcePath = constants.resolveEsm(`${entryName}.d.ts`);
    const targetPath = constants.resolveCjs(`${entryName}.d.ts`);
    return fse.copy(sourcePath, targetPath);
  }));
}

async function buildDts$3() {
  await buildTypes();
}

async function build$3() {
  if (constants.cwd !== constants.core) {
    throw new Error('is not components package');
  }
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting build core').start();
  await Promise.all([constants.esm, constants.cjs, constants.umd].map(f => fse.remove(f)));
  await Promise.all([buildBundles$1(), buildModules$3(), buildCss(), buildDts$3()]);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`build core completed! (${time})`);
}

async function buildModules$2() {
  const filePath = constants.resolveCwd('package.json');
  const {
    dependencies,
    peerDependencies
  } = await formatPkgJson(filePath);
  const external = [...dependencies, ...peerDependencies, /node_modules/];
  await compileToModules({
    external
  });
}

async function buildDts$2() {
  await buildTypes();
}

async function build$2() {
  if (constants.cwd !== constants.emator) {
    throw new Error('is not emator package');
  }
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting build emator').start();
  await Promise.all([constants.esm, constants.cjs].map(f => fse.remove(f)));
  await Promise.all([buildModules$2(), buildDts$2()]);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`build emator completed! (${time})`);
}

async function buildModules$1() {
  const filePath = constants.resolveCwd('package.json');
  const {
    dependencies,
    peerDependencies
  } = await formatPkgJson(filePath);
  const external = [...dependencies, ...peerDependencies, /node_modules/];
  await compileToModules({
    external
  });
}
async function buildBundles() {
  const filePath = constants.resolveCwd('package.json');
  const {
    pkgJson,
    peerDependencies
  } = await formatPkgJson(filePath);
  const external = [...peerDependencies, /\.(css|scss|sass)$/];
  await compileToBundles({
    external,
    bundleName: pkgJson.name,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  });
}

async function buildDts$1() {
  await buildTypes();
}

const {
  isArray
} = Array;

function isNullish(obj) {
  return obj == null;
}

function toArray(candidate, strict = false) {
  if (isNullish(candidate)) return [];
  if (isArray(candidate)) return candidate;
  return strict ? [] : [candidate];
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

function formatIconName(file) {
  const basename = path.basename(file);
  const dirname = path.dirname(file);
  return removeExtname(basename).split(/-/g).concat(dirname).map(capitalize).join('');
}

const re$1 = new RegExp(`^${constants.iconAttrNamePrefix}`);
function formatAttrName(attribute) {
  const name = attribute.replace(re$1, '').split('-').map((str, index) => {
    return index === 0 ? str : capitalize(str);
  }).join('');
  return name === 'class' ? 'className' : name;
}

const re = new RegExp(`^${constants.iconAttrNamePrefix}`);
function buildIconNodes(json, type = 'node') {
  const isFormatNode = type === 'node';
  const init = isFormatNode ? [] : {};
  if (!isObject(json)) return init;
  return Object.entries(json).reduce((res, [key, val]) => {
    const isTag = !re.test(key);
    if (!isFormatNode && !isTag) {
      res[formatAttrName(key)] = val;
    } else if (isTag && isArray(res)) {
      toArray(val).forEach(node => {
        res.push({
          tag: key,
          attrs: buildIconNodes(node, 'attr'),
          children: buildIconNodes(node, 'node')
        });
      });
    }
    return res;
  }, init);
}
function buildJsxTags(nodes, level) {
  if (!Array.isArray(nodes)) return '';
  return nodes.reduce((res, node) => {
    const isTopSvg = level === 0 && node.tag === 'svg';
    const text = buildJsxTags(node.children, level + 1);
    const attrs = Object.entries(node.attrs).map(([k, v]) => ` ${k}="${v}"`).join('');
    res += `<${node.tag}${isTopSvg ? ' {...props}' : attrs}>${text}</${node.tag}>`;
    return res;
  }, '');
}
function genIconSource(options) {
  const {
    base64,
    fileName,
    dirName,
    iconName,
    json
  } = options;
  const nodes = buildIconNodes(json);
  const rootAttrs = nodes[0] && nodes[0].tag === 'svg' ? nodes[0].attrs : {};
  return `/* eslint-disable */
// @ts-nocheck
/* This file is automatically generated, please do not manually modify it */
import { withIcon } from "../_shared/components"
import type { IconProps } from "../_shared/types"
import { withDefaults } from "../_shared/utils"

function ${iconName}(_props: IconProps) {
  ${Object.keys(rootAttrs).length ? `const props = withDefaults(_props, ${JSON.stringify(rootAttrs)})` : 'const props = _props'}
  return ${buildJsxTags(nodes, 0)}
}

/** ![${fileName}](${base64}) */
export default withIcon(${iconName}, ${JSON.stringify({
    name: fileName,
    theme: dirName
  })})
`;
}

function optimizeIcon(source) {
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

function toBase64(source) {
  const size = 50;
  const newSource = source.replace(/<svg(.*?)>/, `<svg$1 width="${size}" height="${size}" fill="#cacaca">`).replace(/\#333/g, '#1677ff').replace(/\#E6E6E6/ig, '#e6f4ff');
  return svgo.optimize(newSource, {
    datauri: 'base64'
  }).data;
}

async function genIcons() {
  const assets = constants.resolveIcons('assets');
  const iconsDir = constants.resolveIcons('src/icons');
  const parser = new fastXmlParser.XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: constants.iconAttrNamePrefix
  });
  const iconEntries = [];
  const globOptions = {
    cwd: assets,
    ignore: constants.ignoreFiles
  };
  const files = await glob.async('**/*.svg', globOptions);
  const promises = files.map(async file => {
    const iconName = formatIconName(file);
    const source = await fse.readFile(path.resolve(assets, file), {
      encoding: 'utf8'
    });
    iconEntries.push(`export { default as ${iconName} } from './${iconName}'`);
    const result = genIconSource({
      base64: toBase64(source),
      fileName: removeExtname(path.basename(file)),
      iconName,
      dirName: path.dirname(file),
      json: parser.parse(optimizeIcon(source).data)
    });
    return ensureWriteFile(path.resolve(iconsDir, `${iconName}.tsx`), result);
  });
  await Promise.all(promises);
  const content = `/* eslint-disable */\n\n${iconEntries.join('\n')}`;
  await ensureWriteFile(path.resolve(iconsDir, 'index.tsx'), content);
}

async function build$1() {
  if (constants.cwd !== constants.icons) {
    throw new Error('is not icons package');
  }
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting build icons').start();
  await Promise.all([constants.resolveSrc('icons'), constants.esm, constants.cjs, constants.umd].map(f => fse.remove(f)));
  await genIcons();
  await Promise.all([buildBundles(), buildModules$1(), buildDts$1()]);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`build icons completed! (${time})`);
}
async function generate() {
  if (constants.cwd !== constants.icons) {
    throw new Error('is not icons package');
  }
  await fse.remove(constants.resolveSrc('icons'));
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting generate icons').start();
  await genIcons();
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`generate icons completed! (${time})`);
}

async function buildModules() {
  const filePath = constants.resolveCwd('package.json');
  const {
    dependencies,
    peerDependencies
  } = await formatPkgJson(filePath);
  const external = [...dependencies, ...peerDependencies, /node_modules/];
  await compileToModules({
    external
  });
}

async function buildDts() {
  await buildTypes();
}

async function build() {
  if (constants.cwd !== constants.shared) {
    throw new Error('is not shared package');
  }
  const start = performance.now();
  const spinner = nanospinner.createSpinner('starting build shared').start();
  await Promise.all([constants.esm, constants.cjs].map(f => fse.remove(f)));
  await Promise.all([buildModules(), buildDts()]);
  const end = performance.now();
  const time = colors.info(`${Math.floor(end - start)}ms`);
  spinner.success(`build shared completed! (${time})`);
}

const program = new commander.Command().name('mink cli').description('用于编译/打包 mink-ui 组件库的脚本文件').version('0.0.1');
program.command('build:core').description('build core library').action(build$3);
program.command('build:icons').description('build icon library').action(build$1);
program.command('gen:icons').description('generate icons from svg source files').action(generate);
program.command('build:emator').description('build schema validator library').action(build$2);
program.command('build:shared').description('build shared library').action(build);
program.parse(process.argv);
