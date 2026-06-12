import type { MayBe } from '@mink-ui/shared/interface'
import type { HasSlots, RenderSlotsParams, SlotItem } from '../types/has-slots'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

export interface NormalizeSlotsOptions<T extends Record<string, SlotItem>> {
  currentState: MayBe<HasSlots<T>>
  contextState?: MayBe<HasSlots<T>>
  defaultState?: HasSlots<T>
}

/**
 * @description 格式化 slots 配置，返回一个 renderSlots 函数
 * 传入 { name, children }，如果 slots[name] 存在则调用，否则返回 children
 */
export function normalizeSlots<T extends Record<string, SlotItem>>(
  options: NormalizeSlotsOptions<T>,
) {
  const { currentState, contextState, defaultState } = options

  const slots = shallowMerge<T>(
    currentState?.slots || {},
    contextState?.slots || {},
    defaultState?.slots || {},
  )

  return <K extends keyof T>(params: RenderSlotsParams<T, K>) => {
    const { name, params: args, children } = params

    const fn = slots[name]

    return fn ? fn(children, args) : children
  }
}
