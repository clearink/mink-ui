import type { HasChildren } from '../../_shared/types/has-children'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { CommonSize } from '../../_shared/types/size'
import type { ButtonProps } from './button.props'

export interface ButtonGroupProps extends HasChildren,
  HasSemanticsStyled<'root' | 'icon' | 'text', ButtonProps> {
  /**
   * @description 按钮组尺寸
   * @default 'middle'
   */
  size?: CommonSize
}
