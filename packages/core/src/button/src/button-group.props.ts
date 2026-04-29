import type { CommonSize, HasChildren, SemanticsStyled } from '../../_shared/types'

export interface ButtonGroupProps extends HasChildren,
  SemanticsStyled<'root' | 'icon' | 'text'> {
  /**
   * @description 按钮组尺寸
   * @default 'middle'
   */
  size?: CommonSize
}
