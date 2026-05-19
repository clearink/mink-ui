import type { FocusTrapProps } from '../focus-trap.props'

import { useEffect, useImperativeHandle } from 'react'

import { useConstant } from '../../../../hooks/use-constant'
import { useInvoke } from '../../../../hooks/use-invoke'
import { FocusTrapControl } from '../utils/focus-trap-control'
import { focusElement } from '../utils/helpers'

export function useFocusTrapProps(props: FocusTrapProps) {
  const { ref, active } = props

  const ctrl = useConstant(() => new FocusTrapControl())

  useInvoke(() => { ctrl._bind(props) })

  useImperativeHandle(ref, () => ({
    focus: () => { focusElement(ctrl.start) },
  }), [ctrl])

  useEffect(() => ctrl.subscribe(), [ctrl])

  useEffect(() => ctrl.activate(!!active), [active, ctrl])

  return {
    omitted: props,
    ctrl,
  }
}
