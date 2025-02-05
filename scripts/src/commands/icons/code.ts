import { constants, formatPkgJson } from '../../utils'
import { buildSource } from '../../utils/build-source'

export default async function buildCode() {
  const filePath = constants.resolveCwd('./package.json')

  const { pkgJson, externals } = await formatPkgJson(filePath)

  await buildSource({
    externals,
    bundleName: pkgJson.name,
    replaces: constants.replaces,
    builtins: [
      {
        find: '@mink-ui/shared',
        replacement: constants.resolveShared('src'),
        mapping: constants.resolveSrc('_internal'),
      },
      {
        find: '@mink-ui/icons',
        replacement: constants.resolveSrc('.'),
        mapping: constants.resolveSrc('.'),
      },
    ],
  })
}
