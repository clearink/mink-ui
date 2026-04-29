import type { GroupTransitionProps } from '../group-transition.props'

import { useImperativeHandle } from 'react'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { GroupTransitionControl } from '../utils/group-transition-control'
import { isNodesEqual } from '../utils/helpers'

export function useGroupTransitionProps(props: GroupTransitionProps) {
  const { ref, children } = props

  const forceUpdate = useForceUpdate()

  const control = useConstant(() => new GroupTransitionControl(forceUpdate, props))

  useInvoke(() => { control.updateInternals(props) })

  const returnEarly = useWatchValue(children, {
    compare: (curr, prev) => isNodesEqual(curr, prev),
    listener: (current) => {
      if (isNodesEqual(control.current, current)) return

      control.runGroupTransition()
    },
  })

  useImperativeHandle(ref, () => ({
    get instances() { return control.instances },
  }), [control.instances])

  return {
    omitted: props,
    returnEmpty: returnEarly,
    renderEntries: control.renderEntries,
  }
}
