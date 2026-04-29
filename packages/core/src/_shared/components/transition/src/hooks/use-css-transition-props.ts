import type { CSSProperties } from 'react'
import type { TransitionPhase } from '../_shared.props'
import type { CssTransitionProps } from '../css-transition.props'

import { useImperativeHandle, useInsertionEffect } from 'react'
import { flushSync } from 'react-dom'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { nextFrame, nextTick } from '@mink-ui/shared/dom/raf'
import { makeTimeout } from '@mink-ui/shared/dom/timer'
import { batch } from '@mink-ui/shared/function/batch'
import { fallback } from '@mink-ui/shared/function/fallback'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { useConstant } from '../../../../hooks/use-constant'
import { useEvent } from '../../../../hooks/use-event'
import { useExactState } from '../../../../hooks/use-exact-state'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { cn } from '../../../../libs/cn'
import { isAppear, isEntered, isEntering, isExit, isExited, isExiting, isRunning } from '../_shared.constant'
import { CssTransitionControl } from '../utils/css-transition-control'
import { formatTransitionInfo } from '../utils/format'
import { runCounter } from '../utils/helpers'
import { useNormalizeMotions, useNormalizeTimeouts } from './use-normalize'

export function useCssTransitionProps<E extends HTMLElement>(props: CssTransitionProps<E>) {
  const {
    ref,
    when,
    type,
    mountOnEnter,
    unmountOnExit,
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

  const [isMounted, setIsMounted] = useExactState(when || !(unmountOnExit || mountOnEnter))

  const [cssValues, setCssValues] = useExactState<undefined | CSSProperties>(undefined)

  const returnEarly1 = useWatchValue(when, () => { setIsMounted(true) })

  const returnEarly2 = useWatchValue(`${unmountOnExit}-${mountOnEnter}`, () => {
    if (!isExited(control.state)) return

    setIsMounted(!(unmountOnExit || (mountOnEnter && !control.connected)))
  })

  const cssNamesGetter = useEvent(() => cn(control.names))

  const cssAttrsGetter = useEvent(() => cssValues)

  const runTransitionFinish = (el: E, phase: TransitionPhase) => {
    control.dispose()

    setIsMounted(!unmountOnExit || !!when, () => {
      control.finish(el, phase, motions)

      const attrs = isExit(phase) ? onExited?.(el) : onEntered?.(el, isAppear(phase))

      setCssValues(attrs || undefined)
    })
  }

  const runTransitionCancel = (el: E, phase: TransitionPhase) => {
    control.dispose()

    if (!isRunning(control.state)) return

    isExit(phase) ? onExitCancel?.(el) : onEnterCancel?.(el, isAppear(phase))

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
    control.begin(el, phase, motions)

    const attrs = isExit(phase) ? onExit?.(el) : onEnter?.(el, isAppear(phase))

    flushSync(() => { setCssValues(attrs || undefined) })

    control.active(el, phase, motions)

    const runFrameCleanup = nextFrame(() => {
      control.frame(el, phase, motions)

      const attrs = isExit(phase) ? onExiting?.(el) : onEntering?.(el, isAppear(phase))

      setCssValues(attrs || undefined)

      control.updateCleanup(runTransitionEvents(el, phase))
    })

    return () => {
      runFrameCleanup()

      runTransitionCancel(el, phase)
    }
  })

  useImperativeHandle(ref, () => ({
    get element() { return control.$element },
    get isEntering() { return isEntering(control.state) },
    get isEntered() { return isEntered(control.state) },
    get isExiting() { return isExiting(control.state) },
    get isExited() { return isExited(control.state) },
    get setCssValues() { return setCssValues },
  }), [control, setCssValues])

  useInsertionEffect(() => nextTick(() => {
    const { $element } = control

    const phase = control.calculate(when)

    if (!$element || isUndefined(phase)) return

    return runCssTransition($element, phase)
  }), [when, control, runCssTransition])

  useInsertionEffect(() => () => { control.destroy() }, [control])

  return {
    omitted: props,
    isMounted,
    getters: { names: cssNamesGetter, attrs: cssAttrsGetter },
    returnEmpty: (returnEarly1 || returnEarly2) || !isMounted,
    runConnect: control.connect,
  }
}
