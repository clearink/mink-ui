import { useComposeRefs, useResizeObserver } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { ownerWindow } from '@mink-ui/shared'
import { type ForwardedRef, cloneElement, forwardRef, useEffect, useRef } from 'react'

import type { TooltipContentProps } from './props'

import { getScrollElements } from '../utils/elements'

function TooltipContent(props: TooltipContentProps, _ref: ForwardedRef<any>) {
  const { children, onMounted, onResize, onScroll, isOpen } = props

  const dom = useRef<Element>(null)

  useResizeObserver(dom, onResize)

  useEffect(() => onMounted(dom.current), [onMounted])

  useEffect(() => {
    if (!dom.current || !isOpen) return

    const elements = new Set([ownerWindow(dom.current), ...getScrollElements(dom.current)])

    elements.forEach((el) => { el.addEventListener('scroll', onScroll, { passive: true }) })

    return () => { elements.forEach((el) => { el.removeEventListener('scroll', onScroll) }) }
  }, [isOpen, onScroll])

  const ref = useComposeRefs((children as any).ref, _ref, dom)

  return cloneElement(children, { ref })
}

betterDisplayName(TooltipContent, 'InternalTooltip.Content')

export default forwardRef(TooltipContent)
