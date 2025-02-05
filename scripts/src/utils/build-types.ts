import type { Alias } from '@rollup/plugin-alias'

import fse from 'fs-extra'
import path from 'node:path'
import slash from 'slash'
import tsm from 'ts-morph'

import { constants } from './constants'
import { getBuiltinSources } from './get-builtin-sources'
import { removeExtname } from './remove-extname'

export interface BuildDtsOptions {
  externals: (RegExp | string)[]
  alias: Alias[]
}

// 打包类型
export async function buildTypes() {
  const project = new tsm.Project({
    skipAddingFilesFromTsConfig: true,
    tsConfigFilePath: constants.resolveCwd('tsconfig.json'),
    compilerOptions: {
      declaration: true,
      noEmit: false,
      declarationDir: constants.esm,
      emitDeclarationOnly: true,
    },
  })

  await getBuiltinSources(project)

  // replaceSpecifier(project, options)

  const diagnostics = project.getPreEmitDiagnostics()

  if (diagnostics.length > 0) {
    throw new Error(project.formatDiagnosticsWithColorAndContext(diagnostics))
  }

  await Promise.all(
    project.getSourceFiles().map(async (sourceFile) => {
      await sourceFile.emit({ emitOnlyDtsFiles: true })

      const filePath = sourceFile.getFilePath()

      const entryName = removeExtname(slash(path.relative(constants.src, filePath)))

      const sourcePath = constants.resolveEsm(`${entryName}.d.ts`)

      const targetPath = constants.resolveCjs(`${entryName}.d.ts`)

      return fse.copy(sourcePath, targetPath)
    }),
  )
}
