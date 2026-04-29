import type { ArgumentArray } from 'classnames'

import classNames from 'classnames'

export const cls = (...args: ArgumentArray) => classNames(...args) || undefined
