import type { ReactNode, Ref } from 'react'
import type { CommonSize, SemanticsStyled } from '../../_shared/types'
import type { CollapseItemType, CollapsibleType, ExpandedName, ExpandIconPlacement } from './_shared.props'

import CaretRightOutlined from '@mink-ui/icons/CaretRightOutlined'

export interface CollapseProps extends
  SemanticsStyled<'root' | 'item' | 'header' | 'icon' | 'title' | 'extra' | 'content'> {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLDivElement>

  /**
   * @description 折叠面板内容
   */
  items?: CollapseItemType[]

  /**
   * @description 展开面板名称
   */
  expandedNames?: ExpandedName | ExpandedName[]

  /**
   * @description 默认展开面板名称
   */
  defaultExpandedNames?: ExpandedName | ExpandedName[]

  /**
   * @description 是否为手风琴模式
   */
  accordion?: boolean

  /**
   * @description 是否显示边框
   */
  bordered?: boolean

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
   * @description 是否为幽灵模式, 无背景色
   */
  ghost?: boolean

  /**
   * @description 收起时是否保留元素
   */
  keepMounted?: boolean

  /**
   * @description 折叠面板尺寸
   */
  size?: CommonSize

  /**
   * @description 展开项变化回调
   */
  onChange?: (expandedName: ExpandedName, expandedNames: ExpandedName[]) => void
}

export type DefaultNames = 'bordered' | 'collapsible' | 'expandIcon' | 'expandIconPlacement' | 'size'

export type PickedCollapseProps = Pick<CollapseProps, DefaultNames>

export type OmittedCollapseProps = Omit<CollapseProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultCollapseProps: PickedCollapseProps = {
  bordered: true,
  collapsible: 'header',
  expandIconPlacement: 'start',
  expandIcon: <CaretRightOutlined />,
}
