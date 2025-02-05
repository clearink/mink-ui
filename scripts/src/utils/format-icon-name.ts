import { capitalize } from '@mink-ui/shared'
import path from 'node:path'

import { removeExtname } from './remove-extname'

export function formatIconName(file: string) {
  const basename = path.basename(file)

  const dirname = path.dirname(file)

  return removeExtname(basename)
    .split(/-/g)
    .concat(dirname)
    .map(capitalize)
    .join('')
}
