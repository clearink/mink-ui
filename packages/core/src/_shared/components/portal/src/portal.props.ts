import type { Ref } from 'react'
import type { MayBe } from '@mink-ui/shared/interface'
import type { HasChildren } from '../../../types'
import type { ContainerElement, GetContainerElement } from './_shared.props'

export type PortalInstance = MayBe<ContainerElement>

export interface PortalProps extends HasChildren {
  /**
   * @description 外部引用
   */
  ref?: Ref<PortalInstance>

  /**
   * @description 自定义 portal 容器，为 false 表示不使用 portal
   */
  getContainer?: GetContainerElement
}
