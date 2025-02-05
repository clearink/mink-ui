import { compileToBundles, compileToModules } from '../../utils/compiler'
import { constants } from '../../utils/constants'
import { formatPkgJson } from '../../utils/format-pkg-json'

export async function buildModules() {
  const filePath = constants.resolveCwd('package.json')

  const { dependencies, peerDependencies } = await formatPkgJson(filePath)

  const external: (RegExp | string)[] = [...dependencies, ...peerDependencies, /node_modules/]

  await compileToModules({ external })
}

export async function buildBundles() {
  const filePath = constants.resolveCwd('package.json')

  const { pkgJson, peerDependencies } = await formatPkgJson(filePath)

  const external: (RegExp | string)[] = [...peerDependencies, /\.(css|scss|sass)$/]

  await compileToBundles({
    external,
    bundleName: pkgJson.name,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  })
}
