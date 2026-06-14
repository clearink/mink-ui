import type { CSSProperties, ReactNode, Ref } from 'react'
import type { HasChildren } from '../../_shared/types/has-children'
import type { GetSemanticsValues, HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { CollapsibleType, ExpandedName, ExpandIconPlacement } from './_shared.props'
import type { CollapseProps } from './collapse.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface CollapseItemType extends
  HasChildren,
  Omit<CollapseItemForwardedProps, 'accordion'>,
  Omit<HasSemanticsStyled<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content', CollapseItemProps>, 'prefixCls'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLDivElement>

  /**
   * @description 面板名称，用作唯一标识
   */
  name: ExpandedName

  /**
   * @description 额外内容
   */
  extra?: ReactNode

  /**
   * @description 标题
   */
  title?: ReactNode
}

export interface CollapseItemForwardedProps {
  /**
   * @description 展开触发区域
   */
  collapsible?: CollapsibleType

  /**
   * @description 是否为手风琴模式
   */
  accordion?: boolean

  /**
   * @description 自定义展开图标
   */
  expandIcon?: ReactNode | ((params: { expanded: boolean, name: ExpandedName }) => ReactNode)

  /**
   * @description 展开图标位置
   */
  expandIconPlacement?: ExpandIconPlacement

  /**
   * @description 收起时是否保留元素
   */
  keepMounted?: boolean
}

export interface CollapseItemInjectedProps {
  /**
   * @description 折叠面板项
   */
  item: CollapseItemType

  /**
   * @description 是否展开
   */
  expanded: boolean

  /**
   * @description 外部命名空间
   */
  outerNamespace: string

  /**
   * @description 外部样式类名
   */
  outerCssNames: Omit<GetSemanticsValues<CollapseProps, string>, 'item'>

  /**
   * @description 外部样式属性
   */
  outerCssAttrs: Omit<GetSemanticsValues<CollapseProps, CSSProperties>, 'item'>

  /**
   * @description 展开/收起回调
   */
  onChange: (name: ExpandedName) => void
}

export interface CollapseItemProps extends CollapseItemForwardedProps, CollapseItemInjectedProps {}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const excludedCollapseItemProps = exhaustive<keyof CollapseItemProps>()([
  // extends
  'collapsible',
  'accordion',
  'expandIcon',
  'expandIconPlacement',
  'keepMounted',
  // props
  'item',
  'expanded',
  'outerNamespace',
  'outerCssNames',
  'outerCssAttrs',
  // events
  'onChange',
])
