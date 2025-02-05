import { useImperativeHandle } from 'react'

import type { CssTransitionRef } from '../props'
import type { CssTransitionRefs } from './use-css-transition'

import { isEntered, isEntering, isExited, isExiting } from '../../_shared.constant'

export default function useTransitionExpose<E extends HTMLElement>(
  ref: React.ForwardedRef<CssTransitionRef<E>>,
  refs: CssTransitionRefs<E>,
) {
  useImperativeHandle(ref, () => ({
    get element() { return refs.instance },
    get status() { return refs.status },
    get isEntering() { return isEntering(refs.status) },
    get isEntered() { return isEntered(refs.status) },
    get isExiting() { return isExiting(refs.status) },
    get isExited() { return isExited(refs.status) },
  }), [refs])
}
