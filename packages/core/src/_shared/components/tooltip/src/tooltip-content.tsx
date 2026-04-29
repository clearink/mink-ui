import type { TooltipContentProps } from './tooltip-content.props'

import { cloneElement, useEffect, useRef } from 'react'
import { ownerWindow } from '@mink-ui/shared/dom/global'
import { makeEventListener } from '@mink-ui/shared/dom/listener'

import { useMergeRefs } from '../../../hooks/use-merge-refs'
import { useResizeObserver } from '../../../hooks/use-observer'
import { defineName } from '../../../utils/define-name'
import { getScrollElements } from './utils/element'

function TooltipContent(props: TooltipContentProps) {
  const { children, isOpen, onMounted, onResize, onScroll } = props

  const $element = useRef<Element>(null)

  const ref = useMergeRefs(children.props.ref, $element)

  useResizeObserver($element, onResize)

  useEffect(() => onMounted($element.current), [onMounted])

  useEffect(() => {
    if (!$element.current || !isOpen) return

    const set = new Set(getScrollElements($element.current))
    set.add(ownerWindow($element.current) as any)

    return makeEventListener(Array.from(set), 'scroll', onScroll, { passive: true })
  }, [isOpen, onScroll])

  return cloneElement(children, { ref })
}

defineName(TooltipContent, 'InternalTooltip.Content')

export default TooltipContent
