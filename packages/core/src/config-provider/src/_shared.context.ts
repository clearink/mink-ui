import type { CommonDisabled } from '../../_shared/types/disabled'
import type { GetLayerLevel } from '../../_shared/types/layer'
import type { CommonSize } from '../../_shared/types/size'
import type { GlobalConfig } from './_shared.props'

import { ctxHelper } from '../../_shared/utils/ctx-helper'
import { makeUniqueId } from '../../_shared/utils/make-unique-id'
import { defaultConfigProviderProps } from './config-provider.props'

/**
 * @zh-CN 自定义组件禁用状态 Context
 */
export const DisabledContext = ctxHelper<CommonDisabled>('DisabledContext', undefined)

/**
 * @zh-CN 自定义组件尺寸 Context
 */
export const SizeContext = ctxHelper<CommonSize>('SizeContext', undefined)

/**
 * @description z-index Context
 */
export const LayerLevelContext = ctxHelper<GetLayerLevel>('LayerLevelContext', makeUniqueId(2026))

/**
 * @description 自定义通用组件配置 Context
 */
export const GlobalConfigContext = ctxHelper<GlobalConfig>('ConfigContext', {
  rootPrefixCls: defaultConfigProviderProps.rootPrefixCls,
  iconPrefixCls: defaultConfigProviderProps.iconPrefixCls,
})
