import { betterDisplayName } from '@mink-ui/core/_shared/utils'

import type { ButtonGroupProps } from './props'

function ButtonGroup(props: ButtonGroupProps) {
  const { children } = props

  return <div>{children}</div>
}

betterDisplayName(ButtonGroup, 'Button.Group')

export default ButtonGroup
