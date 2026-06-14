import type { TooltipContentProps } from '../tooltip-content.props'

import { useEffect } from 'react'
import { pushItem } from '@mink-ui/shared/array/push-item'
import { ownerWindow } from '@mink-ui/shared/dom/global'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { batch } from '@mink-ui/shared/function/batch'

import { useResizeObserver } from '../../../../hooks/use-observer'
import { getScrollElements } from '../utils/element'

export function useTooltipContentProps(props: TooltipContentProps) {
  const { ctrl, isOpen, onResize, onMounted, onScroll } = props

  useResizeObserver(ctrl.$popup, isOpen, onResize)

  useEffect(() => onMounted(ctrl.popupElement), [ctrl, onMounted])

  useEffect(() => {
    if (!isOpen || !ctrl.popupElement) return

    const thisWindow = ownerWindow(ctrl.popupElement)

    const elements = getScrollElements(ctrl.popupElement)

    return batch(
      makeEventListener(pushItem(elements, thisWindow as any), 'scroll', onScroll),
      makeEventListener(thisWindow, 'resize', onScroll),
    )
  }, [ctrl, isOpen, onScroll])

  return {
    omitted: props,
  }
}
