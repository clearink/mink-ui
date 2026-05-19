import type { OmittedOverlayProps, OverlayProps, PickedOverlayProps } from '../overlay.props'

import { pick } from '@mink-ui/shared/object/pick'

import { useCombinedSemantics } from '../../../../hooks/use-settings/use-combined'
import { defaultOverlayProps as defaultProps, overlayTransitionProps } from '../overlay.props'

export function useOverlayProps(props: OverlayProps) {
  const {
    mask = defaultProps.mask,
    mountOnEnter = defaultProps.mountOnEnter,
    unmountOnExit = defaultProps.unmountOnExit,
  } = props

  const omitted = props as OmittedOverlayProps
  const picked: PickedOverlayProps = { mask, mountOnEnter, unmountOnExit }

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

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    transitionInherited,
  }
}
