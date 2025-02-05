import type { Project } from 'ts-morph'

import glob from 'fast-glob'
import fse from 'fs-extra'
import path from 'node:path'
import slash from 'slash'

import type { BuiltinTypeDefinitionItem, BuiltinTypescriptCodeItem } from '../interface'

import { constants } from './constants'
import { removeExtname } from './remove-extname'

export function getBuiltinSources(project: Project, builtins: BuiltinTypeDefinitionItem[]) {
  return Promise.all(
    builtins.map(item =>
      glob.async('**/*.ts{,x}', { cwd: item.mapping, ignore: constants.ignoreFiles })
        .then(results =>
          Promise.all(results.map((relative) => {
            const sourcePath = path.resolve(item.mapping, relative)

            const targetPath = path.resolve(item.replacement, relative)

            return fse.readFile(sourcePath, { encoding: 'utf8' })
              .then((content) => {
                project.createSourceFile(targetPath, content, { overwrite: true })
              })
          })),
        )),
  )
}

export async function getBuiltinEntries(builtins: BuiltinTypescriptCodeItem[]) {
  const entries: Record<string, string> = {}

  await Promise.all(
    builtins.map(item =>
      glob.async('**/*.ts{,x}', { cwd: item.replacement, ignore: constants.ignoreFiles })
        .then(results =>
          results.forEach((relative) => {
            const sourcePath = path.resolve(item.replacement, relative)

            const prefixName = slash(path.relative(constants.src, item.mapping))

            const entryName = [prefixName, removeExtname(relative)].filter(Boolean).join('/')

            entries[entryName] = sourcePath
          }),
        )),
  )

  return entries
}
