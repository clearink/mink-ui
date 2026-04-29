import type { ReactElement } from 'react'
import type { HasChildren } from '../../_shared/types'

export interface TouchEffectProps extends Required<HasChildren<ReactElement>> {
  /**
   * @description 组件名称
   */
  component: Capitalize<string>

  /**
   * @description 是否禁用
   */
  disabled?: boolean

  /**
   * @description 容器选择
   */
  selector?: string | ((container: HTMLElement) => HTMLElement | null)
}
