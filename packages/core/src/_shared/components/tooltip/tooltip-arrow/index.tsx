import type { TooltipArrowProps } from './props'

import { betterDisplayName } from '../../../../_shared/utils'

function TooltipArrow(props: TooltipArrowProps) {
  const { className, show, style } = props

  return show ? <div className={className} style={style} /> : null
}

betterDisplayName(TooltipArrow, 'InternalTooltip.Arrow')

export default TooltipArrow
