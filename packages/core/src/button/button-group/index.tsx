import type { ButtonGroupProps } from './props'

import { betterDisplayName } from '../../_shared/utils'

function ButtonGroup(props: ButtonGroupProps) {
  const { children } = props

  return <div>{children}</div>
}

betterDisplayName(ButtonGroup, 'Button.Group')

export default ButtonGroup
