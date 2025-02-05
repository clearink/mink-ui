import fse from 'fs-extra'

export async function formatPkgJson(filePath: string) {
  return fse.readJson(filePath).then((json) => {
    const { dependencies = {}, peerDependencies = {} } = json

    return {
      pkgJson: json as Record<string, any>,
      dependencies: Object.keys(dependencies),
      peerDependencies: Object.keys(peerDependencies),
    }
  })
}
