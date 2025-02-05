import { useConstant, useExactState, useWatchValue } from '@mink-ui/core/_shared/hooks'
import { getClientCoords, reflow } from '@mink-ui/shared'

import type { SegmentedType } from '../props'

class SegmentedRefs {
  $group = { current: null as HTMLDivElement | null }

  $thumb = { current: null as HTMLDivElement | null }

  items = new Map<null | SegmentedType, HTMLElement | null>()

  inTransition = false

  get group() {
    return this.$group.current
  }

  get thumb() {
    return this.$thumb.current
  }

  reset = () => {
    this.inTransition = false
  }
}

export default function useSegmented<E extends HTMLElement = HTMLElement>(
  active: SegmentedType,
) {
  const refs = useConstant(() => new SegmentedRefs())

  const [history, setHistory] = useExactState<(null | SegmentedType)[]>([null, active])

  const [showThumb, setShowThumb] = useExactState(false)

  const updateThumbStyles = (el: HTMLElement, itemCoords: DOMRect) => {
    const groupCoords = getClientCoords(refs.group!)

    const delta = itemCoords.left - groupCoords.left

    el.style.setProperty('transform', `translate3d(${delta}px, 0, 0)`)

    el.style.setProperty('width', `${itemCoords.width}px`)
  }

  const keepThumbStyles = () => {
    if (!refs.thumb || !refs.inTransition) return

    const target = refs.items.get(active)

    if (!target || !refs.group) return

    updateThumbStyles(refs.thumb as any, getClientCoords(target))
  }

  const handleEnter = (el: E) => {
    const from = refs.items.get(history[0])

    if (!from || !refs.group) return

    refs.inTransition = true

    el.style.setProperty('transition-duration', '0s', 'important')

    updateThumbStyles(el, getClientCoords(from))

    reflow(el)

    el.style.removeProperty('transition-duration')
  }

  const handleEntering = (el: E) => {
    const target = refs.items.get(history[1])

    if (!target || !refs.group) return

    updateThumbStyles(el, getClientCoords(target))
  }

  const handleEntered = (el: E) => {
    refs.inTransition = false

    el.style.removeProperty('transform')

    el.style.removeProperty('width')

    setShowThumb(false)
  }

  const returnEarly = useWatchValue(active, () => {
    setHistory([history[1], active])

    setShowThumb(true)

    keepThumbStyles()
  })

  return {
    returnEarly,
    refs,
    showThumb,
    handleEnter,
    handleEntering,
    handleEntered,
  }
}
