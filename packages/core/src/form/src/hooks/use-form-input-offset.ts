import type { OmittedFormItemInputProps } from '../form-item-input.props'

import { useImperativeHandle, useRef } from 'react'
import { ownerComputedStyle } from '@mink-ui/shared/dom/global'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { useEvent } from '../../../_shared/hooks/use-event'
import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'

/**
 * @description FormItemInput 偏移值, 用于保证视图的连贯
 */
export function useFormInputOffset(omitted: OmittedFormItemInputProps) {
  const { ref, help, warnings, errors, onGetFormItemElement } = omitted

  const $extra = useRef<HTMLDivElement>(null)

  const [offset, setOffset] = useExactState({ margin: 0, extra: 0 })

  const hasError = !isNullish(help) || !!(warnings.length || errors.length)

  const onUpdateOffset = useEvent(() => {
    if (!hasError) return

    const extra = $extra.current
    const item = onGetFormItemElement()

    if (!item && !extra) return

    const marginBottom = item ? ownerComputedStyle(item).marginBottom : '0'

    const clientHeight = extra ? extra.clientHeight : 0

    setOffset({ margin: Number.parseFloat(marginBottom), extra: clientHeight })
  })

  const returnEarly = useWatchValue(hasError, onUpdateOffset)

  const onCleanupOffset = useEvent(() => {
    if (hasError) return

    setOffset({ margin: 0, extra: 0 })
  })

  // 向外暴露方法
  useImperativeHandle(ref, () => onUpdateOffset, [onUpdateOffset])

  return {
    $extra,
    offset,
    hasError,
    returnEmpty: returnEarly,
    onCleanupOffset,
  }
}
