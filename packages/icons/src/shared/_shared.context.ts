import type { IconConfig } from './_shared.props'

import { ctxHelper } from './utils/ctx-helper'

/**
 * @description 自定义通用组件配置 Context
 */
export const IconConfigContext = ctxHelper<IconConfig>('IconConfigContext', {
  prefixCls: 'minkicon',
})
