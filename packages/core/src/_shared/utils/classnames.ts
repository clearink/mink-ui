import classNames, { type ArgumentArray } from 'classnames'

export const cls = (...args: ArgumentArray) => classNames(...args) || undefined
