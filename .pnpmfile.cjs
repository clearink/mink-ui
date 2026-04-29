function transformExports(input) {
  return Object.entries(input).reduce((result, [key, file]) => {
    if (typeof file === 'string') {
      result[key] = file.replace(/\.\/src\/(.+)$/, './esm/$1')

      return result
    }

    const subItem = {}

    Object.entries(file).forEach(([subKey, subFile]) => {
      if (subKey === 'types') {
        subItem[subKey] = subFile.replace(/\.\/src\/(.+)\.(.*?)$/, './esm/$1.d.ts')
      }
      else if (subKey === 'import') {
        subItem[subKey] = subFile.replace(/\.\/src\/(.+)\.(.*?)$/, './esm/$1.mjs')
      }
      else if (subKey === 'require') {
        subItem[subKey] = subFile.replace(/\.\/src\/(.+)\.(.*?)$/, './lib/$1.js')
      }
    })

    result[key] = subItem

    return result
  }, {})
}

module.exports = {
  hooks: {
    beforePacking(pkg) {
      if (`${pkg.name}`.startsWith('@mink-ui')) {
        pkg.exports = transformExports(pkg.exports)
      }

      return pkg
    },
  },
}
