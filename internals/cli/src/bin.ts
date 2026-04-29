#!/usr/bin/env node

import { Command } from 'commander'

import { bundle as bundleCore } from './commands/core'
import { bundle as bundleIcons, generate as genIcons, sub as subIcons } from './commands/icons'
import { bundle as bundleShared, sub as subShared } from './commands/shared'

const program = new Command().name('mink cli').description('用于编译/打包 mink-ui 组件库的脚本文件').version('0.0.1')

program
  .command('build:core')
  .description('build mink-ui core components')
  .action(bundleCore)

program
  .command('build:icons')
  .description('build mink-ui icon components')
  .action(bundleIcons)

program
  .command('gen:icons')
  .description('generate icons from svg source files')
  .action(genIcons)

program
  .command('sub:icons')
  .description('generate icons subpath import')
  .action(subIcons)

program
  .command('build:shared')
  .description('build shared library')
  .action(bundleShared)

program
  .command('sub:shared')
  .description('generate shared subpath import')
  .action(subShared)

program.parse(process.argv)
