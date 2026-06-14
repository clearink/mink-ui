import type { HTMLAttributes, ReactNode } from 'react'
import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'

export interface BadgeInjectedProps extends
  HasSemanticsStyled<'root' | 'indicator', BadgeProps> {
  /**
   * @description 徽标内容
   */
  count?: ReactNode

  /**
   * @description 展示封顶数字
   * @default 99
   */
  overflowCount?: number

  /**
   * @description 不展示数字，只展示一个小圆点
   * @default false
   */
  dot?: boolean
}

export interface BadgeProps extends BadgeInjectedProps, HTMLAttributes<HTMLSpanElement> {}

export type DefaultNames = 'overflowCount'

export type PickedBadgeProps = Pick<BadgeProps, DefaultNames>

export type OmittedBadgeProps = Omit<BadgeProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultBadgeProps: PickedBadgeProps = {
  overflowCount: 99,
}
