import type { TooltipContentProps } from '../tooltip-content.props'

import { useEffect } from 'react'
import { pushItem } from '@mink-ui/shared/array/push-item'
import { ownerWindow } from '@mink-ui/shared/dom/global'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { batch } from '@mink-ui/shared/function/batch'

import { useResizeObserver } from '../../../../hooks/use-observer'
import { findScrollElements } from '../../../../utils/element'

export function useTooltipContentProps(props: TooltipContentProps) {
  const { ctrl, isOpen, onEnqueue, onFramedUpdate, onTickedUpdate } = props

  useResizeObserver(ctrl.$popup, isOpen, onTickedUpdate)

  useEffect(() => onEnqueue(ctrl.popup), [ctrl, onEnqueue])

  useEffect(() => {
    if (!isOpen || !ctrl.popup) return

    const thisWindow = ownerWindow(ctrl.popup)

    const elements = findScrollElements(ctrl.popup)

    return batch(
      makeEventListener(pushItem(elements, thisWindow as any), 'scroll', onFramedUpdate),
      makeEventListener(thisWindow, 'resize', onFramedUpdate),
    )
  }, [ctrl, isOpen, onFramedUpdate])

  return {
    omitted: props,
  }
}
