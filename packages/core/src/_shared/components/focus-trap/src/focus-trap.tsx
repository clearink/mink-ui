import type { FocusTrapProps } from './focus-trap.props'

import { defineName } from '../../../utils/define-name'
import { visuallyHidden } from './_shared.constant'
import { useFocusTrapProps } from './hooks/use-focus-trap-props'

function FocusTrap(props: FocusTrapProps) {
  const { omitted, ctrl } = useFocusTrapProps(props)

  const { children, active } = omitted

  return (
    <>
      <div ref={ctrl.$start} style={visuallyHidden} tabIndex={active ? 0 : -1} />
      {children}
      <div ref={ctrl.$end} style={visuallyHidden} tabIndex={active ? 0 : -1} />
    </>
  )
}

defineName(FocusTrap)

export default FocusTrap
