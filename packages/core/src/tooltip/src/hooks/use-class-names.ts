import type { OmittedTooltipProps } from '../tooltip.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'

export function useTooltipClassNames(omitted: OmittedTooltipProps) {
  const { prefixCls } = omitted

  const ns = useNamespace('tooltip', prefixCls)

  return {
    root: ns,
    arrow: `${ns}__arrow`,
    wrapper: `${ns}-wrapper`,
  }
}
