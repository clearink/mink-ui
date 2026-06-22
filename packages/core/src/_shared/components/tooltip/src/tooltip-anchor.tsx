import type { TooltipAnchorProps } from './tooltip-anchor.props'

import { Children, cloneElement } from 'react'

import { defineName } from '../../../utils/define-name'
import { useTooltipAnchorProps } from './hooks/use-tooltip-anchor-props'

function TooltipAnchor(props: TooltipAnchorProps) {
  const { omitted, restAttrs } = useTooltipAnchorProps(props)

  const { children } = omitted

  return cloneElement(Children.only(children), restAttrs)
}

defineName(TooltipAnchor, 'InternalTooltip.Anchor')

export default TooltipAnchor
