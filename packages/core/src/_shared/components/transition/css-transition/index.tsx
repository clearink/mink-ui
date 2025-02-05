import { betterDisplayName, cls, fillRef } from '@mink-ui/core/_shared/utils'
import { isFunction } from '@mink-ui/shared'
import { cloneElement, forwardRef, useEffect } from 'react'

import type { CssTransitionProps, CssTransitionRef } from './props'

import useCssTransition from './hooks/use-css-transition'
import useTransitionExpose from './hooks/use-transition-expose'

function CssTransition<E extends HTMLElement>(
  props: CssTransitionProps<E>,
  ref: React.ForwardedRef<CssTransitionRef<E>>,
) {
  const { children } = props

  const { returnEarly, refs, isMounted, transitionClass } = useCssTransition(props)

  useTransitionExpose(ref, refs)

  // fix react strict mode
  useEffect(() => () => { refs.reset() }, [refs])

  const refCallback = (el: E | null) => {
    fillRef(el, (children as any).ref)

    refs.instance = el

    if (el) refs.hasMounted = true
  }

  if (returnEarly || !isMounted) return null

  return isFunction(children)
    ? children(refCallback, cls(transitionClass))
    : cloneElement(children, {
        ref: refCallback,
        className: cls(children.props.className, transitionClass),
      })
}

betterDisplayName(CssTransition)

export default forwardRef(CssTransition) as <E extends HTMLElement>(
  props: CssTransitionProps<E> & React.RefAttributes<CssTransitionRef<E>>,
) => JSX.Element | null
