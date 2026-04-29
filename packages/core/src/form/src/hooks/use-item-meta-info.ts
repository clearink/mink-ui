import type { MetaChangeEvent } from '../_shared.props'

import { useRef } from 'react'

import { _getId } from '../../../_shared/components/form/src'
import { useEvent } from '../../../_shared/hooks/use-event'
import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useThrottleFrame } from '../../../_shared/hooks/use-scheduler'
import { initialMetaInfo, shouldFormItemMetaInfoUpdate } from '../utils/helpers'

/**
 * @description Form.Item 组件自身的 metaInfo
 */
export function useFormItemMetaInfo() {
  const [state, setState] = useExactState(initialMetaInfo)

  return [state, useThrottleFrame((event: MetaChangeEvent) => {
    if (!event.mounted) return

    const different = shouldFormItemMetaInfoUpdate(state, event)

    different && setState(event)
  })] as const
}

export type PureItemMetaInfo = Record<string, MetaChangeEvent | undefined>
/**
 * @description Form.Item 组件其下所有 pure 字段的 metaInfo
 */
export function useFormItemPureInfo() {
  // 其下所有的pure字段错误信息在此收集
  const [pureInfo, setPureInfo] = useExactState<PureItemMetaInfo>({})

  const records = useRef<PureItemMetaInfo>(Object.create(null))

  const throttled = useThrottleFrame(() => {
    // 将 records 中的数据附加到 pureInfo 中
    const cloned = { ...pureInfo, ...records.current }

    // 清空 records
    records.current = Object.create(null)

    setPureInfo(cloned)
  })

  return [pureInfo, useEvent((event: MetaChangeEvent) => {
    const _id = _getId(event.name)

    // 记录所有，避免因为 throttle 丢掉某些字段信息
    records.current[_id] = event.mounted ? event : undefined

    throttled()
  })] as const
}
