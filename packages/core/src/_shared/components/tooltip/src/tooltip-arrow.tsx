import type { TooltipArrowProps } from './tooltip-arrow.props'

import { defineName } from '../../../utils/define-name'

function TooltipArrow(props: TooltipArrowProps) {
  const { className, show, style } = props

  return show ? <div className={className} style={style} /> : null
}

defineName(TooltipArrow, 'InternalTooltip.Arrow')

export default TooltipArrow
