import type { GroupTransitionRef } from '@mink-ui/core/_shared/components'
import type { MayBe } from '@mink-ui/shared'
import type { CSSProperties, ReactElement } from 'react'

import { useConstant, useExactState, useForceUpdate } from '@mink-ui/core/_shared/hooks'

import type { NotificationStackConfig } from '../../_shared.props'
import type { NotificationListProps } from '../props'

import normalizeStackState from '../utils/normalize-stack-state'

export class NotificationListRefs {
  components: GroupTransitionRef['components'] | undefined = undefined

  panels = new Map<MayBe<ReactElement['key']>, HTMLElement>()

  // 由于 mouseleave 与 mouseenter 触发间隔太短, 故使用 ref 记录该值
  hovers = new Set<MayBe<ReactElement['key']>>()

  reset = () => {
    this.hovers.clear()
  }
}

export default function useNotificationList<E extends HTMLElement>(
  props: NotificationListProps,
  stackEnable: boolean,
  stackConfig: NotificationStackConfig,
) {
  const { notices, placement } = props

  const refs = useConstant(() => new NotificationListRefs())

  const forceUpdate = useForceUpdate()

  const [transforms, setTransforms] = useExactState(() => {
    return new Map<MayBe<ReactElement['key']>, CSSProperties>()
  })

  const runHoverCleanup = () => {
    const set = new Set(notices.map(e => e.key))

    const oldCount = refs.hovers.size

    refs.hovers.forEach((key) => { if (!set.has(key)) refs.hovers.delete(key) })

    if (refs.hovers.size !== oldCount) forceUpdate()
  }

  const handleMouseEnter = (key: MayBe<ReactElement['key']>) => {
    if (!stackEnable) return

    runHoverCleanup()

    refs.hovers.add(key)

    forceUpdate()
  }

  const handleMouseLeave = (key: MayBe<ReactElement['key']>) => {
    if (!stackEnable) return

    refs.hovers.delete(key)

    forceUpdate()
  }

  const applyTransforms = () => {
    const nextTransforms = new Map<ReactElement['key'], CSSProperties>()

    normalizeStackState({ props, refs, stackEnable, stackConfig })
      .forEach(({ delta, scale, height }, key) => {
        const dx = placement === 'top' || placement === 'bottom' ? '-50%' : '0'

        const transform = `translate3d(${dx}, ${delta}px, 0) scaleX(${scale})`

        nextTransforms.set(key, { transform, height })
      })

    setTransforms(nextTransforms)
  }

  const removeTransforms = () => { setTransforms(new Map()) }

  const handleUpdate = stackEnable ? applyTransforms : removeTransforms

  const handleEnter = stackEnable ? runHoverCleanup : undefined

  const handleEntering = stackEnable ? applyTransforms : undefined

  const handleExit = (el: E) => {
    el.style.setProperty('height', `${el.offsetHeight}px`)
  }

  const handleExiting = (el: E) => {
    if (stackEnable) applyTransforms()

    el.style.setProperty('height', '0px')
  }

  return {
    refs,
    transforms,
    handleUpdate,
    handleEnter,
    handleEntering,
    handleExit,
    handleExiting,
    handleMouseEnter,
    handleMouseLeave,
  }
}
