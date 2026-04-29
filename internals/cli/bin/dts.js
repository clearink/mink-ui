'use strict';

var node_fs = require('node:fs');
var path = require('node:path');
var fsExtra = require('fs-extra');
var node_child_process = require('node:child_process');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefault(path);

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

async function main() {
  const cwd = node_fs.realpathSync(process.cwd());
  await action('tsc -b ./tsconfig.build.json', cwd);
  const sourcePath = path__default.default.resolve(cwd, 'lib/constants.d.ts');
  const targetPath = path__default.default.resolve(cwd, 'lib/index.d.ts');
  await fsExtra.remove(targetPath);
  await fsExtra.rename(sourcePath, targetPath);
}
main();
