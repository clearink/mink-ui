import type { ReactNode } from 'react'

/**
 * @description slot 渲染函数签名：第一个参数为 ReactNode，返回 ReactNode，其余参数任意
 */
export type SlotItem = (node: ReactNode, ...args: any[]) => ReactNode

/**
 * @description renderSlots 调用参数
 * - 当 T[N] 只有 1 个参数时，不需要 params
 * - 当 T[N] 有 2 个参数时，params 必填
 */
export type RenderSlotsParams<T extends Record<string, SlotItem>, N extends keyof T> = {
  name: N
  children: ReactNode
} & (Parameters<T[N]> extends { length: 2 }
  ? { params: Parameters<T[N]>[1] }
  : { params?: never })

export interface HasSlots<T extends Record<string, SlotItem>> {
  /**
   * @description 自定义 slot 渲染
   */
  slots?: Partial<T>
}
