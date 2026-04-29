import type { CSSProperties, ReactNode, Ref } from 'react'
import type { HasChildren, SemanticsStyled } from '../../_shared/types'
import type { GetSemanticsValues } from '../../_shared/types/styled'
import type { ExpandedName } from './_shared.props'
import type { CollapseProps } from './collapse.props'

export interface CollapseItemProps extends HasChildren,
  Omit<SemanticsStyled<'root' | 'header' | 'icon' | 'title' | 'extra' | 'content'>, 'prefixCls'>,
  Pick<CollapseProps, 'accordion' | 'collapsible' | 'expandIcon' | 'expandIconPlacement' | 'keepMounted'> {
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
  rootNamespace?: string

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

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const excludedCollapseItemProps = [
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
  'onChange',
] as const
