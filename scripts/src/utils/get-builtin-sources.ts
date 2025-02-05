import type { Project } from 'ts-morph'

import glob from 'fast-glob'
import path from 'node:path'

import { constants } from './constants'
import { removeExtname } from './remove-extname'

export function getBuiltinSources(project: Project) {
  return glob
    .async('**/*.ts{,x}', { cwd: constants.src, ignore: constants.ignoreFiles })
    .then((results) => {
      results.forEach((relative) => { project.addSourceFileAtPath(constants.resolveSrc(relative)) })
    })
}

export function getBuiltinEntries() {
  return glob
    .async('**/*.ts{,x}', { cwd: constants.src, ignore: constants.ignoreFiles })
    .then((results) => {
      return results.reduce((entries, relative) => {
        const entryName = removeExtname(relative)
        entries[entryName] = path.resolve(constants.src, relative)
        return entries
      }, {} as Record<string, string>)
    })
}
