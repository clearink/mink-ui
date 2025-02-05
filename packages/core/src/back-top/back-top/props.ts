import type { MouseEventHandler } from 'react'

import type { HasChildren, SemanticStyledProps } from '../../_shared/types'

export interface BackTopProps extends HasChildren, SemanticStyledProps<'root'> {
  /**
   * @zh-CN 滚动时长
   */
  duration?: number
  /**
   * @zh-CN 点击事件
   */
  onClick?: MouseEventHandler<HTMLElement>
  /**
   *
   * @zh-CN 滚动目标元素
   */
  target?: () => Document | HTMLElement | Window
  /**
   * @zh-CN 滚动阈值
   */
  threshold?: number
}
