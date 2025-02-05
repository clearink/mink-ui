import { buildTypes, constants, formatPkgJson } from '../../utils'

export default async function buildDts() {
  const filePath = constants.resolveCwd('./package.json')

  const { externals } = await formatPkgJson(filePath)

  await buildTypes({
    externals,
    builtins: [
      {
        find: '@mink-ui/shared',
        replacement: constants.resolveSrc('_internal'),
        mapping: constants.resolveShared('src'),
      },
      {
        find: '@mink-ui/core',
        replacement: constants.resolveSrc('.'),
        mapping: constants.resolveSrc('.'),
      },
    ],
  })
}
