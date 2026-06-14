import type { TouchEffectInfo } from './_shared.props'

import { ctxHelper } from '../../_shared/utils/ctx-helper'

export interface TouchEffectContextState {
  /**
   * @description 是否禁用
   */
  disabled?: boolean | ((touchEffectInfo: TouchEffectInfo) => boolean)

  /**
   * @description 点击效果
   */
  showEffect?: (touchEffectInfo: TouchEffectInfo) => void
}

/**
 * @zh-CN 自定义组件点击反馈效果 Context
 */
export const TouchEffectContext = ctxHelper<TouchEffectContextState | undefined>('TouchEffectContext', undefined)
