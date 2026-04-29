import type { HTMLAttributes, ReactNode } from 'react'
import type { SemanticsStyled } from '../../_shared/types'

export interface BadgeProps extends
  HTMLAttributes<HTMLSpanElement>,
  SemanticsStyled<'root' | 'indicator'> {

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
