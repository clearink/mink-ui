import type { CSSProperties } from 'react'
import type { TransitionPhase } from '../_shared.props'
import type { CssTransitionProps } from '../css-transition.props'

import { useImperativeHandle, useInsertionEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { nextFrame, nextTick } from '@mink-ui/shared/dom/raf'
import { makeTimeout } from '@mink-ui/shared/dom/timer'
import { batch } from '@mink-ui/shared/function/batch'
import { fallback } from '@mink-ui/shared/function/fallback'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useCommitState } from '../../../../hooks/use-commit-state'
import { useConstant } from '../../../../hooks/use-constant'
import { useEvent } from '../../../../hooks/use-event'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { cn } from '../../../../libs/cn'
import { isAppear, isEntered, isEntering, isExit, isExited, isExiting } from '../_shared.constant'
import { CssTransitionControl } from '../utils/css-transition-control'
import { formatTransitionInfo } from '../utils/format'
import { runCounter } from '../utils/helpers'
import { useNormalizeMotions, useNormalizeTimeouts } from './use-normalize'

export function useCssTransitionProps<E extends HTMLElement>(props: CssTransitionProps<E>) {
  const {
    _item,
    ref,
    when,
    type,
    mountOnEnter,
    unmountOnExit,
    skipBeginning,
    onEnter,
    onEntering,
    onEntered,
    onEnterCancel,
    onExit,
    onExiting,
    onExited,
    onExitCancel,
  } = props

  const motions = useNormalizeMotions(props)

  const timeouts = useNormalizeTimeouts(props)

  const control = useConstant(() => new CssTransitionControl<E>(props, motions))

  const [isMounted, setIsMounted] = useCommitState (when || !(unmountOnExit || mountOnEnter))

  const [cssValues, setCssValues] = useState<undefined | CSSProperties>(undefined)

  const namesGetter = useEvent(() => cn(control.names))

  const attrsGetter = useEvent(() => cssValues)

  const runTransitionFinish = (el: E, phase: TransitionPhase) => {
    control.runEventCleanup()

    setIsMounted(!unmountOnExit || !!when, () => {
      control.finish(el, phase, motions)

      isExit(phase) ? onExited?.(el, _item) : onEntered?.(el, isAppear(phase), _item)

      setCssValues(undefined)
    })
  }

  const runTransitionCancel = (el: E, phase: TransitionPhase) => {
    control.runEventCleanup()

    if (!isEntering(control.state) && !isExiting(control.state)) return

    isExit(phase) ? onExitCancel?.(el, _item) : onEnterCancel?.(el, isAppear(phase), _item)

    control.cancel(phase)
  }

  const runTransitionEvents = (el: E, phase: TransitionPhase) => {
    const timeout = timeouts[phase]

    const resolve = () => { runTransitionFinish(el, phase) }

    const handler = (e: Event) => { e.target === el && runTransitionFinish(el, phase) }

    const { transition, animation } = formatTransitionInfo(el)

    if (transition.timeout <= 0 && animation.timeout <= 0) {
      return makeTimeout(fallback(timeout, 0)!, resolve)
    }

    if (type === 'transition' && transition.timeout > 0) {
      return batch(
        makeEventListener(el, 'transitionend', runCounter(transition.count, handler)),
        makeTimeout(fallback(timeout, transition.timeout)! + 1, resolve),
      )
    }

    if (type === 'animation' && animation.timeout > 0) {
      return batch(
        makeEventListener(el, 'animationend', runCounter(animation.count, handler)),
        makeTimeout(fallback(timeout, animation.timeout)! + 1, resolve),
      )
    }

    if (transition.timeout > animation.timeout) {
      return batch(
        makeEventListener(el, 'transitionend', runCounter(transition.count, handler)),
        makeTimeout(fallback(timeout, transition.timeout)! + 1, resolve),
      )
    }

    return batch(
      makeEventListener(el, 'animationend', runCounter(animation.count, handler)),
      makeTimeout(fallback(timeout, animation.timeout)! + 1, resolve),
    )
  }

  const runCssTransition = useEvent((el: E, phase: TransitionPhase) => {
    const frameCleanup = nextFrame(() => {
      control.frame(el, phase, motions)

      const attrs = isExit(phase) ? onExiting?.(el, _item) : onEntering?.(el, isAppear(phase), _item)

      setCssValues(attrs || undefined)

      control.setEventCleanup(runTransitionEvents(el, phase))
    })

    control.setFrameCleanup(() => { frameCleanup(); runTransitionCancel(el, phase) })

    const skip = control.begin(el, phase, motions, !!skipBeginning)

    const attrs = skip ? null : isExit(phase) ? onExit?.(el, _item) : onEnter?.(el, isAppear(phase), _item)

    !skip && flushSync(() => { setCssValues(attrs || undefined) })

    !skip && control.active(el, phase, motions)
  })

  const returnEarly1 = useWatchValue(
    !!when,
    () => { setIsMounted(true) },
    (curr, prev) => isMounted || shallowEqual(curr, prev),
  )

  const returnEarly2 = useWatchValue(
    `${!!unmountOnExit}-${!!mountOnEnter}`,
    () => { setIsMounted(!(unmountOnExit || (mountOnEnter && !control.connected))) },
    (curr, prev) => !isExited(control.state) || shallowEqual(curr, prev),
  )

  useImperativeHandle(ref, () => ({
    get element() { return control.element },
    get isEntering() { return isEntering(control.state) },
    get isEntered() { return isEntered(control.state) },
    get isExiting() { return isExiting(control.state) },
    get isExited() { return isExited(control.state) },
    get setCssValues() { return setCssValues },
  }), [control, setCssValues])

  useInsertionEffect(() => {
    const tickCleanup = nextTick(() => {
      const phase = control.compute(!!when)

      if (!control.element || isUndefined(phase)) return

      runCssTransition(control.element, phase)
    })

    return () => { tickCleanup(); control.runFrameCleanup() }
  }, [when, control, runCssTransition])

  useInsertionEffect(() => () => { control.destroy() }, [control])

  return {
    omitted: props,
    control,
    getters: { names: namesGetter, attrs: attrsGetter },
    returnEmpty: (returnEarly1 || returnEarly2) || !isMounted,
  }
}
