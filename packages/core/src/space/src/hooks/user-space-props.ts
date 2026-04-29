import type { CSSProperties } from 'react'
import type { OmittedSpaceProps, PickedSpaceProps, SpaceProps } from '../space.props'

import { useMemo } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { defaultSpaceProps as defaultProps, excludedSpaceProps } from '../space.props'
import { useSpaceClassNames } from './use-class-names'

export function useSpaceProps(props: SpaceProps) {
  const globalConfig = useConfiguration('space')

  const {
    size = fallback(globalConfig.size, defaultProps.size),
    orientation = defaultProps.orientation,
    wrap = defaultProps.wrap,
  } = props

  const omitted = props as OmittedSpaceProps
  const picked: PickedSpaceProps = { size, orientation, wrap }

  const { classNames, hGutter, hIsNumeric, vGutter, vIsNumeric } = useSpaceClassNames(picked, omitted)

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

  const extraCssAttrs = useMemo(() => {
    const result: CSSProperties = {}

    if (hIsNumeric) result.columnGap = hGutter

    if (vIsNumeric) result.rowGap = vGutter

    return result
  }, [hGutter, hIsNumeric, vGutter, vIsNumeric])

  const restAttrs = omit(props, excludedSpaceProps)

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
    extraCssAttrs,
  }
}
