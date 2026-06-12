import type { AnyObj } from '@mink-ui/shared/interface'
import type { TooltipContentProps } from '../tooltip-content.props'

import { useEffect, useRef } from 'react'
import { ownerWindow } from '@mink-ui/shared/dom/global'
import { makeEventListener } from '@mink-ui/shared/dom/listener'

import { getElementRef, useCombinedRefs } from '../../../../hooks/use-combined-refs'
import { useResizeObserver } from '../../../../hooks/use-observer'
import { getScrollElements } from '../utils/element'

export function useTooltipContentProps(props: TooltipContentProps) {
  const { isOpen, children, onResize, onMounted, onScroll } = props

  const $el = useRef<Element>(null)

  const refCombined = useCombinedRefs($el, getElementRef(children))

  const restAttrs: AnyObj = { ref: refCombined }

  useResizeObserver($el, onResize)

  useEffect(() => onMounted($el.current), [onMounted])

  useEffect(() => {
    if (!$el.current || !isOpen) return

    const set = new Set(getScrollElements($el.current))
    set.add(ownerWindow($el.current) as any)

    return makeEventListener(Array.from(set), 'scroll', onScroll)
  })

  return {
    omitted: props,
    restAttrs,
  }
}
