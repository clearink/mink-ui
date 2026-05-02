import type { ReactNode } from 'react'
import type { CommonDisabled, CommonSize, ComponentStyled, GetLayerLevel } from '../../_shared/types'
import type { AlertProps } from '../../alert/src'
import type { BadgeProps } from '../../badge/src'
import type { ButtonProps } from '../../button/src'
import type { CheckboxProps } from '../../checkbox/src'
import type { CollapseProps } from '../../collapse/src'
import type { DividerProps } from '../../divider/src'
import type { FormProps } from '../../form/src'
import type { NotificationConfig } from '../../notification/src'
import type { SegmentedProps } from '../../segmented/src'
import type { SpaceProps } from '../../space/src'
import type { TooltipProps } from '../../tooltip/src'
import type { TouchEffectGlobalConfig } from '../../touch-effect/src/_shared.context'

export interface AlertGlobalConfig extends ComponentStyled<AlertProps>,
  Pick<AlertProps, 'closable' | 'closeIcon'> {
  successIcon?: ReactNode
  infoIcon?: ReactNode
  errorIcon?: ReactNode
  warningIcon?: ReactNode
}

export interface BadgeGlobalConfig extends ComponentStyled<BadgeProps>,
  Pick<BadgeProps, 'overflowCount'> {}

export interface ButtonGlobalConfig extends ComponentStyled<ButtonProps>,
  Pick<ButtonProps, 'variant' | 'theme' | 'shape'> {}

export interface CheckboxGlobalConfig extends ComponentStyled<CheckboxProps> {}

export interface CollapseGlobalConfig extends ComponentStyled<CollapseProps> {}

export interface DividerGlobalConfig extends ComponentStyled<DividerProps> {}

export interface FormGlobalConfig extends ComponentStyled<FormProps>,
  Pick<FormProps, 'colon' | 'requiredMark' | 'validateMessages' | 'variant' | 'scrollToFirstError'> {}

export interface SegmentedGlobalConfig extends ComponentStyled<SegmentedProps>,
  Pick<SegmentedProps, 'size'> {}

export interface SpaceGlobalConfig extends ComponentStyled<SpaceProps>,
  Pick<SpaceProps, 'size'> {}

export interface TooltipGlobalConfig extends ComponentStyled<TooltipProps>,
  Pick<TooltipProps, 'arrow' | 'trigger'> {
  /**
   * @description 共用一个 tooltip 实例
   */
  shared?: boolean
}

export interface NotificationGlobalConfig extends NotificationConfig {}

export interface ComponentGlobalConfig {
  alert?: AlertGlobalConfig

  badge?: BadgeGlobalConfig

  button?: ButtonGlobalConfig

  checkbox?: CheckboxGlobalConfig

  collapse?: CollapseGlobalConfig

  divider?: DividerGlobalConfig

  form?: FormGlobalConfig

  notification?: NotificationGlobalConfig

  segmented?: SegmentedGlobalConfig

  space?: SpaceGlobalConfig

  touchEffect?: TouchEffectGlobalConfig

  tooltip?: TooltipGlobalConfig
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
