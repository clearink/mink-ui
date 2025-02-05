import { useComposeRefs, useResizeObserver } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { batch } from '@mink-ui/shared'
import { type ForwardedRef, cloneElement, forwardRef, useEffect, useRef } from 'react'

import type { TooltipTriggerProps } from './props'

import { getScrollElements } from '../utils/elements'

function TooltipTrigger(props: TooltipTriggerProps, _ref: ForwardedRef<any>) {
  const { children, events, onResize, onScroll, isOpen } = props

  const dom = useRef<Element>(null)

  useResizeObserver(dom, onResize)

  useEffect(() => {
    if (!dom.current || !isOpen) return

    const elements = getScrollElements(dom.current)

    elements.forEach((el) => { el.addEventListener('scroll', onScroll, { passive: true }) })

    return () => { elements.forEach((el) => { el.removeEventListener('scroll', onScroll) }) }
  }, [isOpen, onScroll])

  const ref = useComposeRefs((children as any).ref, _ref, dom)

  const cloneProps = Object.entries(events).reduce((result, [key, fn]) => {
    result[key] = batch(fn, children.props[key])

    return result
  }, {} as typeof events)

  return cloneElement(children, { ref, ...cloneProps })
}

betterDisplayName(TooltipTrigger, 'InternalTooltip.Trigger')

export default forwardRef(TooltipTrigger)
