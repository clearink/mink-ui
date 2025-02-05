import type { HasChildren, SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { SizeType } from '@mink-ui/core/config-provider/_shared.context'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends
  HasChildren,
  SemanticStyledProps<'icon' | 'root' | 'text'>,
  ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @zh-CN 块级格式
   * @en-US 块级格式 en
   */
  block?: boolean

  /**
   * @zh-CN 禁用
   * @en-US 禁用 en
   */
  disabled?: boolean
  /**
   * @zh-CN 幽灵按钮
   * @en-US 幽灵按钮 en
   */
  ghost?: boolean

  /**
   * @zh-CN 前缀图标
   * @en-US 前缀图标 en
   */
  icon?: ReactNode

  /**
   * @zh-CN 加载中
   * @en-US 加载中 en
   */
  loading?: { delay: number } | boolean

  /**
   * @zh-CN 形状
   * @en-US 形状 en
   * @enum
   * @default `default`
   */
  shape?: 'circle' | 'default' | 'round'

  /**
   * @zh-CN 按钮大小
   * @default `middle`
   */
  size?: SizeType

  /**
   * @zh-CN  按钮主题
   * @enum
   * @default primary
   */
  theme?: 'danger' | 'info' | 'primary' | 'success' | 'warning'

  /**
   * @zh-CN 变体(在不影响布局属性的情况下所派生出的类型)
   * @en-US 变体(在不影响布局属性的情况下所派生出的类型) en
   * @default `outlined`
   */
  variant?: 'dashed' | 'filled' | 'link' | 'outlined' | 'text'
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultButtonProps: Partial<ButtonProps> = {
  theme: 'primary',
  type: 'button',
  variant: 'outlined',
}
