import type { PortalInstance } from '../../../portal/src'
import type { OmittedOverlayProps, OverlayProps, PickedOverlayProps } from '../overlay.props'

import { useRef } from 'react'

import { useCombinedSemantics } from '../../../../hooks/use-settings/use-combined'
import { defaultOverlayProps as defaultProps } from '../overlay.props'

export function useOverlayProps(props: OverlayProps) {
  const {
    mask = defaultProps.mask,
    mountOnEnter = defaultProps.mountOnEnter,
    unmountOnExit = defaultProps.unmountOnExit,
  } = props

  const omitted = props as OmittedOverlayProps
  const picked: PickedOverlayProps = { mask, mountOnEnter, unmountOnExit }

  const $portal = useRef<PortalInstance>(null)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      omitted.styles,
      { root: omitted.style },
    ],
  )

  return {
    picked,
    omitted,
    $portal,
    cssNames,
    cssAttrs,
  }
}
