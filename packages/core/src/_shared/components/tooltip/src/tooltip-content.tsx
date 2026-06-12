import type { TooltipContentProps } from './tooltip-content.props'

import { cloneElement } from 'react'

import { defineName } from '../../../utils/define-name'
import { useTooltipContentProps } from './hooks/use-tooltip-content-props'

function TooltipContent(props: TooltipContentProps) {
  const { omitted, restAttrs } = useTooltipContentProps(props)

  const { children } = omitted

  return cloneElement(children, restAttrs)
}

defineName(TooltipContent, 'InternalTooltip.Content')

export default TooltipContent
