import type { ArgumentArray } from 'classnames'

import classNames from 'classnames'

export function cn(...args: ArgumentArray) {
  return classNames(...args) || undefined
}
