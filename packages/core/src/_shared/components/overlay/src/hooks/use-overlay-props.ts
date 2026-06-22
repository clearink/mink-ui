import type { PortalInstance } from '../../../portal/src'
import type { CssTransitionInstance } from '../../../transition/src/css-transition.props'
import type { OmittedOverlayProps, OverlayProps, PickedOverlayProps } from '../overlay.props'

import { useImperativeHandle, useRef } from 'react'
import { pick } from '@mink-ui/shared/object/pick'

import { useCombinedSemantics } from '../../../../hooks/use-settings/use-combined'
import { defaultOverlayProps as defaultProps, overlayTransitionProps } from '../overlay.props'

export function useOverlayProps(props: OverlayProps) {
  const {
    ref,
    mask = defaultProps.mask,
    mountOnEnter = defaultProps.mountOnEnter,
    unmountOnExit = defaultProps.unmountOnExit,
  } = props

  const omitted = props as OmittedOverlayProps
  const picked: PickedOverlayProps = { mask, mountOnEnter, unmountOnExit }

  const $portal = useRef<PortalInstance>(null)
  const $transition = useRef<CssTransitionInstance>(null)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      omitted.styles,
      { root: omitted.style },
    ],
    { meta: { ...omitted, ...picked } },
  )

  const transitionInherited = pick(props, overlayTransitionProps)

  useImperativeHandle(ref, () => ({
    get portal() { return $portal.current },
    get motion() { return $transition.current?.element || null },
  }), [])

  return {
    picked,
    omitted,
    $portal,
    $transition,
    cssNames,
    cssAttrs,
    transitionInherited,
  }
}
