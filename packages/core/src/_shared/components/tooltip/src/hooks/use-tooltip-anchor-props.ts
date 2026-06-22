import type { AnyObj } from '@mink-ui/shared/interface'
import type { TooltipAnchorProps } from '../tooltip-anchor.props'

import { useEffect } from 'react'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { batch } from '@mink-ui/shared/function/batch'
import { isObject } from '@mink-ui/shared/is/is-object'

import { getElementRef, useComposeRefs } from '../../../../hooks/use-compose-refs'
import { useResizeObserver } from '../../../../hooks/use-observer'
import { findScrollElements } from '../../../../utils/element'

export function useTooltipAnchorProps(props: TooltipAnchorProps) {
  const {
    ref,
    isOpen,
    anchor,
    children,
    handlers,
    onFramedUpdate,
    onTickedUpdate,
  } = props

  const refComposed = useComposeRefs(ref, getElementRef(children) as typeof ref)

  const original = isObject(children.props) ? children.props : {}

  const restAttrs = Object.entries(handlers).reduce((result, [k, v]) => {
    result[k] = batch(v, original[k])

    return result
  }, { ref: refComposed } as AnyObj)

  useResizeObserver(anchor, isOpen, onTickedUpdate)

  useEffect(() => {
    if (!isOpen || !anchor) return

    const elements = findScrollElements(anchor)

    return makeEventListener(elements, 'scroll', onFramedUpdate)
  }, [isOpen, anchor, onFramedUpdate])

  return {
    omitted: props,
    restAttrs,
  }
}
