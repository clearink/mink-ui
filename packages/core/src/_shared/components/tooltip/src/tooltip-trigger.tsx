import type { TooltipTriggerProps } from './tooltip-trigger.props'

import { cloneElement } from 'react'

import { defineName } from '../../../utils/define-name'
import { useTooltipTriggerProps } from './hooks/use-tooltip-trigger-props'

function TooltipTrigger(props: TooltipTriggerProps) {
  const { omitted, restAttrs } = useTooltipTriggerProps(props)

  const { children } = omitted

  return cloneElement(children, restAttrs)
}

defineName(TooltipTrigger, 'InternalTooltip.Trigger')

export default TooltipTrigger
