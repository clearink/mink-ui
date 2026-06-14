import type { CSSProperties, ReactNode, Ref } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { CssTransitionGetters } from '../../_shared/components/transition/src'
import type { GetSemanticsValues } from '../../_shared/types/has-semantics'
import type { HasSlots } from '../../_shared/types/has-slots'
import type { MasonryItemType } from './_shared.props'
import type { MasonryProps } from './masonry.props'

export interface MasonryItemForwardedProps<V = any> extends
  HasSlots<{ item: (node: ReactNode, params: MasonryItemType<V>) => ReactNode }> {
}

export interface MasonryItemInjectedProps<V = any> {
  /**
   * @description 外部引用
   */
  ref: Ref<HTMLDivElement>

  /**
   * @description 配置项
   */
  item: MasonryItemType<V>

  /**
   * @description 动画配置
   */
  getters: CssTransitionGetters

  /**
   * @description 是否启用观察
   */
  enabled: boolean

  /**
   * @description 外部命名空间
   */
  outerNamespace: string

  /**
   * @description 外部样式类名
   */
  outerCssNames: Omit<GetSemanticsValues<MasonryProps, string>, 'item'>

  /**
   * @description 外部样式属性
   */
  outerCssAttrs: Omit<GetSemanticsValues<MasonryProps, CSSProperties>, 'item'>

  /**
   * @description 外部样式变量
   */
  outerCssVars: Record<string, string> | undefined

  /**
   * @description 收集 DOM 元素
   */
  onCollect: (el: HTMLElement | null, item: MasonryItemType<V>) => void

  /**
   * @description 布局变化回调
   */
  onReLayout: VoidFn
}

export interface MasonryItemProps<V = any> extends MasonryItemForwardedProps<V>, MasonryItemInjectedProps<V> {}
