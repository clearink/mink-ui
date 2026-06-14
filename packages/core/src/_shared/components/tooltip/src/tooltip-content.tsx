import type { TooltipContentProps } from './tooltip-content.props'

import { defineName } from '../../../utils/define-name'
import { useTooltipContentProps } from './hooks/use-tooltip-content-props'

function TooltipContent(props: TooltipContentProps) {
  const { omitted } = useTooltipContentProps(props)

  const { children } = omitted

  return children
}

defineName(TooltipContent, 'InternalTooltip.Content')

export default TooltipContent
