import type { ReactNode } from 'react'
import type { CommonDisabled, CommonSize, ComponentStyled, GetLayerLevel } from '../../_shared/types'
import type { AlertProps } from '../../alert/src'
import type { BadgeProps } from '../../badge/src'
import type { ButtonProps } from '../../button/src'
import type { CollapseProps } from '../../collapse/src'
import type { DividerProps } from '../../divider/src'
import type { FormProps } from '../../form/src'
import type { SegmentedProps } from '../../segmented/src'
import type { SpaceProps } from '../../space/src'
import type { TooltipProps } from '../../tooltip/src'
import type { TouchEffectGlobalConfig } from '../../touch-effect/src/_shared.context'

export interface ButtonGlobalConfig extends ComponentStyled<ButtonProps>,
  Pick<ButtonProps, 'variant' | 'theme' | 'shape'> {}

export interface FormGlobalConfig extends ComponentStyled<FormProps>,
  Pick<FormProps, 'colon' | 'requiredMark' | 'validateMessages' | 'variant' | 'scrollToFirstError'> {}

export interface SpaceGlobalConfig extends ComponentStyled<SpaceProps>,
  Pick<SpaceProps, 'size'> {}

export interface TooltipGlobalConfig extends ComponentStyled<TooltipProps>,
  Pick<TooltipProps, 'arrow' | 'trigger'> {
  /**
   * @description 共用一个 tooltip 实例
   */
  shared?: boolean
}

export interface AlertGlobalConfig extends ComponentStyled<AlertProps>,
  Pick<AlertProps, 'closable' | 'closeIcon'> {
  successIcon?: ReactNode
  infoIcon?: ReactNode
  errorIcon?: ReactNode
  warningIcon?: ReactNode
}

export interface DividerGlobalConfig extends ComponentStyled<DividerProps> {}

export interface BadgeGlobalConfig extends ComponentStyled<BadgeProps>,
  Pick<BadgeProps, 'overflowCount'> {}

export interface CollapseGlobalConfig extends ComponentStyled<CollapseProps> {}

export interface SegmentedGlobalConfig extends ComponentStyled<SegmentedProps>,
  Pick<SegmentedProps, 'size'> {}

export interface ComponentGlobalConfig {
  touchEffect?: TouchEffectGlobalConfig

  button?: ButtonGlobalConfig

  form?: FormGlobalConfig

  space?: SpaceGlobalConfig

  tooltip?: TooltipGlobalConfig

  alert?: AlertGlobalConfig

  divider?: DividerGlobalConfig

  badge?: BadgeGlobalConfig

  collapse?: CollapseGlobalConfig

  segmented?: SegmentedGlobalConfig
}

export interface GlobalConfig extends ComponentGlobalConfig {
  /**
   * @description 组件尺寸
   */
  size?: CommonSize

  /**
   * @description 禁用
   */
  disabled?: CommonDisabled

  /**
   * @description 自定义 z-index
   */
  getLayerLevel?: GetLayerLevel

  /**
   * @description 组件 className 前缀
   */
  rootPrefixCls?: string

  /**
   * @description icon className 前缀
   */
  iconPrefixCls?: string
}
