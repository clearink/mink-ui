#!/usr/bin/env node
import { Command } from 'commander'

import core from './commands/core'
import emator from './commands/emator'
import icons, { generate } from './commands/icons'

const program = new Command()
  .name('mink cli')
  .description('用于编译/打包 mink-ui 组件库的脚本文件')
  .version('0.0.1')

program
  .command('build:core')
  .description('build core library')
  .action(core)

program
  .command('build:icons')
  .description('build icon library')
  .action(icons)

program
  .command('gen:icons')
  .description('generate icons from svg source files')
  .action(generate)

program
  .command('build:emator')
  .description('build schema validator library')
  .action(emator)

program.parse(process.argv)
