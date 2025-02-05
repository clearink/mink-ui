import type { ExportDeclaration, ImportDeclaration, Project } from 'ts-morph'

import type { BuildDtsOptions } from './build-types'

import { resolveAlias } from './resolve-alias'

// 可能不需要递归
export default function replaceSpecifier(
  project: Project,
  options: BuildDtsOptions,
) {
  const { externals, alias } = options

  project.getSourceFiles().forEach((sourceFile) => {
    const filePath = sourceFile.getFilePath()

    const resolveCallback = (node: ExportDeclaration | ImportDeclaration) => {
      const specifier = node.getModuleSpecifierValue()

      const newSpecifier = resolveAlias({ specifier, filePath, externals, alias })

      if (newSpecifier) node.setModuleSpecifier(newSpecifier)
    }

    sourceFile.getImportDeclarations().forEach(resolveCallback)

    sourceFile.getExportDeclarations().forEach(resolveCallback)
  })
}
