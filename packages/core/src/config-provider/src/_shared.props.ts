import type { CommonDisabled } from '../../_shared/types/disabled'
import type { GetLayerLevel } from '../../_shared/types/layer'
import type { CommonSize } from '../../_shared/types/size'
import type { AlertGlobalConfig } from '../../alert/src/_shared.props'
import type { BadgeGlobalConfig } from '../../badge/src/_shared.props'
import type { ButtonGlobalConfig } from '../../button/src/_shared.props'
import type { CheckboxGlobalConfig } from '../../checkbox/src/_shared.props'
import type { CollapseGlobalConfig } from '../../collapse/src/_shared.props'
import type { DividerGlobalConfig } from '../../divider/src/_shared.props'
import type { FormGlobalConfig } from '../../form/src/_shared.props'
import type { MasonryGlobalConfig } from '../../masonry/src/_shared.props'
import type { ModalGlobalConfig } from '../../modal/src/_shared.props'
import type { NotificationGlobalConfig } from '../../notification/src/_shared.props'
import type { SegmentedGlobalConfig } from '../../segmented/src/_shared.props'
import type { SpaceGlobalConfig } from '../../space/src/_shared.props'
import type { TooltipGlobalConfig } from '../../tooltip/src/_shared.props'
import type { TouchEffectGlobalConfig } from '../../touch-effect/src/_shared.props'

export interface ComponentGlobalConfig {
  alert?: AlertGlobalConfig

  badge?: BadgeGlobalConfig

  button?: ButtonGlobalConfig

  checkbox?: CheckboxGlobalConfig

  collapse?: CollapseGlobalConfig

  divider?: DividerGlobalConfig

  form?: FormGlobalConfig

  masonry?: MasonryGlobalConfig

  modal?: ModalGlobalConfig

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
