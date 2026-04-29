import type { OmittedTooltipProps, PickedTooltipProps, TooltipProps } from '../tooltip.props'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { useTooltipClassNames } from './use-class-names'

export function useTooltipProps(props: TooltipProps) {
  const globalConfig = useConfiguration('tooltip')

  const {
    arrow = globalConfig.arrow,
    trigger = globalConfig.trigger,
  } = props

  const omitted = props as OmittedTooltipProps
  const picked: PickedTooltipProps = { arrow, trigger }

  const rns = useNamespace(preset => preset)

  const classNames = useTooltipClassNames(omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      props.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
    ],
  )

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    rns,
  }
}
