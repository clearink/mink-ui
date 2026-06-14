import type { AnyObj } from '@mink-ui/shared/interface'
import type { TooltipTriggerProps } from '../tooltip-trigger.props'

import { useEffect } from 'react'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { batch } from '@mink-ui/shared/function/batch'
import { isObject } from '@mink-ui/shared/is/is-object'

import { getElementRef, useCombinedRefs } from '../../../../hooks/use-combined-refs'
import { useResizeObserver } from '../../../../hooks/use-observer'
import { getScrollElements } from '../utils/element'

export function useTooltipTriggerProps(props: TooltipTriggerProps) {
  const { ref, isOpen, children, handlers, triggerElement, onResize, onScroll } = props

  const refCombined = useCombinedRefs(ref, getElementRef(children) as typeof ref)

  const original = isObject(children.props) ? children.props : {}

  const restAttrs = Object.entries(handlers).reduce((result, [k, v]) => {
    result[k] = batch(v, original[k])

    return result
  }, { ref: refCombined } as AnyObj)

  useResizeObserver(triggerElement, isOpen, onResize)

  useEffect(() => {
    if (!isOpen || !triggerElement) return

    const elements = getScrollElements(triggerElement)

    return makeEventListener(elements, 'scroll', onScroll)
  }, [isOpen, triggerElement, onScroll])

  return {
    omitted: props,
    restAttrs,
  }
}
