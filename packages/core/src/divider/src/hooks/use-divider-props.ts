import type { DividerProps, OmittedDividerProps, PickedDividerProps } from '../divider.props'

import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { normalizeOrientation } from '../../../_shared/utils/orientation'
import { SizeContext } from '../../../config-provider/src/_shared.context'
import { defaultDividerProps as defaultProps, excludedDividerProps } from '../divider.props'
import { useDividerClassNames } from './use-class-names'

export function useDividerProps(props: DividerProps) {
  const globalConfig = useConfiguration('divider')
  const sizeContext = SizeContext.use()

  const {
    vertical,
    orientation: _orientation,
    align = defaultProps.align,
    variant = defaultProps.variant,
    size = sizeContext,
  } = props

  const omitted = props as OmittedDividerProps
  const picked: PickedDividerProps = { align, variant, size }

  const orientation = normalizeOrientation(_orientation, vertical)

  const { classNames } = useDividerClassNames(picked, omitted, { orientation })

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
    { meta: { ...omitted, ...picked, orientation } },
  )

  const restAttrs = omit(props, excludedDividerProps)

  return {
    omitted,
    cssNames,
    cssAttrs,
    orientation,
    restAttrs,
  }
}
