import type { TooltipProps } from './tooltip.props'

import { fallback } from '@mink-ui/shared/function/fallback'

import InternalTooltip from '../../_shared/components/tooltip/src'
import { defineName } from '../../_shared/utils/define-name'
import { isConcreteElement } from '../../_shared/utils/element'
import { useTooltipProps } from './hooks/use-tooltip-props'

function Tooltip(props: TooltipProps) {
  const {
    picked,
    omitted,
    rns,
    cssNames,
    cssAttrs,
  } = useTooltipProps(props)

  const { children, transition } = omitted

  return (
    <InternalTooltip
      {...omitted}
      {...picked}
      className={undefined}
      classNames={cssNames}
      style={undefined}
      styles={cssAttrs}
      transition={fallback(transition, `${rns}-zoom-fast`)}
    >
      {isConcreteElement(children) ? children : <span>{children}</span>}
    </InternalTooltip>
  )
}

defineName(Tooltip)

export default Tooltip
