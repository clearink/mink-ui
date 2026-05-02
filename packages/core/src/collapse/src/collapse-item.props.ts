import type { CSSProperties, ReactNode, Ref } from 'react'
import type { HasChildren, SemanticsStyled } from '../../_shared/types'
import type { GetSemanticsValues } from '../../_shared/types/styled'
import type { CollapsibleType, ExpandedName, ExpandIconPlacement } from './_shared.props'
import type { CollapseProps } from './collapse.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface CollapseItemForwardedProps {
  /**
   * @description 是否为手风琴模式
   */
  accordion?: boolean

  /**
   * @description 展开触发区域
   */
  collapsible?: CollapsibleType

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

export interface CollapseItemInjectedProps extends
  HasChildren,
  Omit<SemanticsStyled<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content'>, 'prefixCls'> {
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

  /**
   * @description 是否展开
   */
  expanded: boolean

  /**
   * @description 根节点命名空间
   */
  rootNamespace: string

  /**
   * @description 根节点样式名称
   */
  rootCssNames: Omit<GetSemanticsValues<CollapseProps, string>, 'item'>

  /**
   * @description 根节点样式属性
   */
  rootCssAttrs: Omit<GetSemanticsValues<CollapseProps, CSSProperties>, 'item'>

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
  'children',
  'className',
  'classNames',
  'style',
  'styles',
  'accordion',
  'collapsible',
  'expandIcon',
  'expandIconPlacement',
  'keepMounted',
  // props
  'ref',
  'name',
  'extra',
  'title',
  'expanded',
  'rootCssNames',
  'rootCssAttrs',
  'rootNamespace',
  // events
  'onChange',
])
