import { useWatchValue } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { forwardRef, useImperativeHandle } from 'react'

import type { GroupTransitionProps, GroupTransitionRef } from './props'

import { isNodesEqual } from '../utils/node-equal'
import useTransitionStore from './hooks/use-transition-store'

function GroupTransition<E extends HTMLElement>(
  props: GroupTransitionProps<E>,
  ref: React.ForwardedRef<GroupTransitionRef>,
) {
  const { children } = props

  const { actions, states } = useTransitionStore(props)

  useImperativeHandle(ref, () => ({
    get components() { return states.components },
  }), [states])

  const returnEarly = useWatchValue(children, () => {
    if (isNodesEqual(states.current, children)) return false

    return (actions.updateElements(), true)
  })

  return returnEarly ? null : <>{actions.renderNodes(children)}</>
}

betterDisplayName(GroupTransition)

export default forwardRef(GroupTransition) as <E extends HTMLElement>(
  props: GroupTransitionProps<E> & React.RefAttributes<GroupTransitionRef<E>>,
) => JSX.Element | null
