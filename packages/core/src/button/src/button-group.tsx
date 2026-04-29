import type { ButtonGroupProps } from './button-group.props'

import { defineName } from '../../_shared/utils/define-name'

function ButtonGroup(props: ButtonGroupProps) {
  const { children } = props

  return (
    <div>
      {children}
    </div>
  )
}

defineName(ButtonGroup, 'Button.Group')

export default ButtonGroup
