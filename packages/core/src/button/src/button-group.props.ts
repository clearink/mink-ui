import type { HasChildren } from '../../_shared/types/has-children'
import type { CommonSize } from '../../_shared/types/size'
import type { SemanticsStyled } from '../../_shared/types/styled'
import type { ButtonProps } from './button.props'

export interface ButtonGroupProps extends HasChildren,
  SemanticsStyled<'root' | 'icon' | 'text', ButtonProps> {
  /**
   * @description 按钮组尺寸
   * @default 'middle'
   */
  size?: CommonSize
}
