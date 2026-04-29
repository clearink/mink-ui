import type { TooltipProps } from './tooltip.props'

import { fallback } from '@mink-ui/shared/function/fallback'

import InternalTooltip from '../../_shared/components/tooltip/src'
import { defineName } from '../../_shared/utils/define-name'
import { useTooltipProps } from './hooks/use-tooltip-props'

function Tooltip(props: TooltipProps) {
  const {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    rns,
  } = useTooltipProps(props)

  const { arrow, trigger } = picked
  const { transition } = omitted

  return (
    <InternalTooltip
      {...omitted}
      className={undefined}
      classNames={cssNames}
      style={undefined}
      styles={cssAttrs}
      arrow={arrow}
      transition={fallback(transition, `${rns}-zoom-fast`)}
      trigger={trigger}
    />
  )
}

defineName(Tooltip)

export default Tooltip
