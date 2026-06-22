import type { MasonryItemProps } from '../masonry-item.props'

import { useRef } from 'react'

import { useComposeRefs } from '../../../_shared/hooks/use-compose-refs'
import { useEvent } from '../../../_shared/hooks/use-event'
import { useResizeObserver } from '../../../_shared/hooks/use-observer'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { normalizeSlots } from '../../../_shared/utils/slots'
import { useMasonryItemClassNames } from './use-class-names'

export function useMasonryItemProps<V = any>(props: MasonryItemProps<V>) {
  const {
    ref,
    item,
    slots,
    getters,
    enabled,
    outerCssNames,
    outerCssAttrs,
    outerCssVars,
    onCollect,
    onReLayout,
  } = props

  const $root = useRef<HTMLElement>(null)

  const { classNames } = useMasonryItemClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      outerCssNames,
      classNames,
      { root: getters.names() },
    ],
    [
      outerCssAttrs,
      { root: outerCssVars },
      { root: getters.attrs() },
    ],
    {},
  )

  const renderSlots = normalizeSlots({
    currentState: { slots },
  })

  const refComposed = useComposeRefs(ref, $root, useEvent((el) => { onCollect(el, item) }))

  useResizeObserver($root, enabled, onReLayout)

  return {
    omitted: props,
    cssNames,
    cssAttrs,
    refComposed,
    renderSlots,
  }
}
