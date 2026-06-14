import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'
import type { HasChildren } from '../../_shared/types/has-children'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { CommonSize } from '../../_shared/types/size'
import type {
  ButtonLoading,
  ButtonShape,
  ButtonTheme,
  ButtonVariant,
  IconPlacement,
} from './_shared.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface ButtonInjectedProps extends
  HasChildren,
  HasSemanticsStyled<'root' | 'icon' | 'text', ButtonProps> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>

  /**
   * @description 按钮加载状态
   */
  loading?: boolean | ButtonLoading

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
   * @description 图标位置
   */
  iconPlacement?: IconPlacement

  /**
   * @default `default`
   * @description 按钮形状
   */
  shape?: ButtonShape

  /**
   * @description 按钮尺寸
   * @default `middle`
   */
  size?: CommonSize

  /**
   * @default `primary`
   * @description 按钮主题
   */
  theme?: ButtonTheme

  /**
   * @default `outlined`
   * @description 按钮变体
   */
  variant?: ButtonVariant

  /**
   * @description 超链接
   */
  href?: string

  /**
   * @function
   * @description 点击事件，元素可能是 `<button>` 或 `<a>`
   */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export interface ButtonProps extends
  ButtonInjectedProps,
  Omit<AnchorHTMLAttributes<HTMLElement>, 'type' | 'onClick'>,
  Omit<ButtonHTMLAttributes<HTMLElement>, 'onClick'> {
}

export type DefaultNames = 'shape' | 'size' | 'theme' | 'variant' | 'disabled' | 'iconPlacement'

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

export const excludedButtonProps = exhaustive<DefaultNames | keyof ButtonInjectedProps>()([
  // extends
  'children',
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  // props
  'ref',
  'loading',
  'block',
  'disabled',
  'ghost',
  'icon',
  'iconPlacement',
  'shape',
  'size',
  'theme',
  'variant',
  'href',
  // events
  'onClick',
])
