import type { DividerProps, OmittedDividerProps, PickedDividerProps } from '../divider.props'

import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { SizeContext } from '../../../config-provider/src/_shared.context'
import { normalizeOrientation } from '../../../config-provider/src/utils/orientation'
import { defaultDividerProps as defaultProps, excludedDividerProps } from '../divider.props'
import { useDividerClassNames } from './use-class-names'

export function useDividerProps(props: DividerProps) {
  const globalConfig = useConfiguration('divider')
  const sizeContext = SizeContext.use()

  const {
    vertical,
    orientation,
    align = defaultProps.align,
    variant = defaultProps.variant,
    size = sizeContext,
  } = props

  const omitted = props as OmittedDividerProps
  const picked: PickedDividerProps = { align, variant, size }

  const finalOrientation = normalizeOrientation(orientation, vertical)

  const classNames = useDividerClassNames(picked, omitted, finalOrientation)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
    ],
  )

  const restAttrs = omit(props, excludedDividerProps)

  return {
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
    finalOrientation,
  }
}
