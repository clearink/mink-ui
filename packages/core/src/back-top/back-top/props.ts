import type { HasChildren, SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { MouseEventHandler } from 'react'

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
