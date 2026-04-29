import type { AnyObj } from '@mink-ui/shared/interface'
import type { TooltipTriggerProps } from './tooltip-trigger.props'

import { cloneElement, useEffect, useRef } from 'react'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { batch } from '@mink-ui/shared/function/batch'

import { useMergeRefs } from '../../../hooks/use-merge-refs'
import { useResizeObserver } from '../../../hooks/use-observer'
import { defineName } from '../../../utils/define-name'
import { getScrollElements } from './utils/element'

function TooltipTrigger(props: TooltipTriggerProps) {
  const { ref, children, events, isOpen, onResize, onScroll } = props

  const $el = useRef<Element>(null)

  const reference = useMergeRefs(children.props.ref, $el, ref)

  useResizeObserver($el, onResize)

  useEffect(() => {
    if (!$el.current || !isOpen) return

    const elements = getScrollElements($el.current)

    return makeEventListener(elements, 'scroll', onScroll, { passive: true })
  }, [isOpen, onScroll])

  const attrs = Object.entries(events).reduce((result, [k, v]) => {
    result[k] = batch(v, children.props[k])

    return result
  }, { ref: reference } as AnyObj)

  return cloneElement(children, attrs)
}

defineName(TooltipTrigger, 'InternalTooltip.Trigger')

export default TooltipTrigger
