import type { ShouldUpdateProps } from './should-update.props'

import { cloneElement, isValidElement, memo } from 'react'

const ShouldUpdate = memo<ShouldUpdateProps>((props) => {
  const { when: _, children, ...rest } = props
  return isValidElement(children) ? cloneElement(children, rest) : children
}, (prev, next) => !next.when(prev, next))

export default ShouldUpdate
