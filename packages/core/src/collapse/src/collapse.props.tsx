import type { Ref } from 'react'
import type { CommonSize } from '../../_shared/types/size'
import type { SemanticsStyled } from '../../_shared/types/styled'
import type { CollapseItemType, ExpandedName } from './_shared.props'
import type { CollapseItemForwardedProps } from './collapse-item.props'

import CaretRightOutlined from '@mink-ui/icons/CaretRightOutlined'

export interface CollapseProps extends
  CollapseItemForwardedProps,
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
   * @description 是否显示边框
   */
  bordered?: boolean

  /**
   * @description 是否为幽灵模式, 无背景色
   */
  ghost?: boolean

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
