import type { AnyObj } from '@mink-ui/shared/interface'
import type { TooltipTriggerProps } from '../tooltip-trigger.props'

import { useEffect, useRef } from 'react'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { batch } from '@mink-ui/shared/function/batch'

import { getElementRef, useCombinedRefs } from '../../../../hooks/use-combined-refs'
import { getScrollElements } from '../utils/element'

export function useTooltipTriggerProps(props: TooltipTriggerProps) {
  const { ref, isOpen, children, events, onScroll } = props

  const $el = useRef<Element>(null)

  const refCombined = useCombinedRefs(ref, $el, getElementRef(children))

  const restAttrs = Object.entries(events).reduce((result, [k, v]) => {
    result[k] = batch(v, children.props[k])

    return result
  }, { ref: refCombined } as AnyObj)

  useEffect(() => {
    if (!$el.current || !isOpen) return

    const elements = getScrollElements($el.current)

    return makeEventListener(elements, 'scroll', onScroll)
  }, [isOpen, onScroll])

  return {
    omitted: props,
    restAttrs,
  }
}
