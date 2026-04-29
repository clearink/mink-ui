import type { InternalTooltipProps } from '../../_shared/components/tooltip/src'

export interface TooltipProps extends InternalTooltipProps {}

export type DefaultNames = 'arrow' | 'trigger'

export type PickedTooltipProps = Pick<TooltipProps, DefaultNames>

export type OmittedTooltipProps = Omit<TooltipProps, DefaultNames>
