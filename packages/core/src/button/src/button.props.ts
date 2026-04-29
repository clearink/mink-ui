import type { ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'
import type { CommonSize, HasChildren, SemanticsStyled } from '../../_shared/types'

export interface ButtonProps extends
  ButtonHTMLAttributes<HTMLButtonElement>,
  HasChildren,
  SemanticsStyled<'root' | 'icon' | 'text', { picked: PickedButtonProps, omitted: OmittedButtonProps }> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLButtonElement>

  /**
   * @description 块级样式
   */
  block?: boolean

  /**
   * @description 按钮禁用
   */
  disabled?: boolean

  /**
   * @description 幽灵按钮
   */
  ghost?: boolean

  /**
   * @description 按钮图标
   */
  icon?: ReactNode

  /**
   * @description 按钮加载状态
   */
  loading?: boolean | { delay: number }

  /**
   * @default `default`
   * @description 按钮形状
   */
  shape?: 'round' | 'default' | 'circle'

  /**
   * @description 按钮尺寸
   * @default `middle`
   */
  size?: CommonSize

  /**
   * @default `primary`
   * @description 按钮主题
   */
  theme?: 'danger' | 'info' | 'primary' | 'success' | 'warning'

  /**
   * @default `outlined`
   * @description 按钮变体
   */
  variant?: 'dashed' | 'filled' | 'outlined' | 'link' | 'text'

  /**
   * @function
   * @description 点击事件，元素可能是 `<button>` 或 `<a>`
   */
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export type DefaultNames = 'shape' | 'size' | 'theme' | 'variant' | 'disabled'

export type PickedButtonProps = Pick<ButtonProps, DefaultNames>

export type OmittedButtonProps = Omit<ButtonProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultButtonProps: Omit<PickedButtonProps, 'disabled'> = {
  shape: 'default',
  size: 'middle',
  theme: 'primary',
  variant: 'outlined',
}

export const excludedButtonProps = [
  // extends
  'children',
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  // props
  'ref',
  'block',
  'disabled',
  'ghost',
  'icon',
  'loading',
  'shape',
  'size',
  'theme',
  'variant',
  // events
  'onClick',
] as const
