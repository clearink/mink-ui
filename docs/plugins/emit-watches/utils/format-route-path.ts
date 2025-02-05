import { constants } from '@mink-ui/scripts'
import path from 'node:path'

import { removeExtname } from './remove-extname'

export default function formatRoutePath(category: string, filePath: string) {
  if (category === 'blog') return removeExtname(path.basename(filePath))

  const rootDir = constants.resolveCore('src')

  const re = new RegExp(`^${rootDir}/(.*?)/__docs__/index\..*?\.md$`)

  const matched = filePath.match(re)

  return matched ? matched[1] : `${Math.random() * 1000 | 0}`
}
