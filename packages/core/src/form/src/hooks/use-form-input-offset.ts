import type { OmittedFormItemInputProps } from '../form-item-input.props'

import { useImperativeHandle, useRef, useState } from 'react'
import { ownerStyle } from '@mink-ui/shared/dom/global'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { useEvent } from '../../../_shared/hooks/use-event'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { isRenderable } from '../../../_shared/utils/renderable'

/**
 * @description FormItemInput 偏移值, 用于保证视图的连贯
 */
export function useFormInputOffset(omitted: OmittedFormItemInputProps) {
  const { ref, help, warnings, errors, onGetFormItemElement } = omitted

  const $extra = useRef<HTMLDivElement>(null)

  const [offset, setOffset] = useState({ margin: 0, extra: 0 })

  const hasError = isRenderable(help) || !!(warnings.length || errors.length)

  const handleUpdate = useEvent(() => {
    if (!hasError) return

    const extra = $extra.current
    const item = onGetFormItemElement()

    if (!item && !extra) return

    const marginBottom = item ? ownerStyle(item).marginBottom : '0'

    const clientHeight = extra ? extra.clientHeight : 0

    setOffset({ margin: Number.parseFloat(marginBottom), extra: clientHeight })
  })

  const handleGroupExited = useEvent(() => { !hasError && setOffset({ margin: 0, extra: 0 }) })

  const returnEarly = useWatchValue(hasError, handleUpdate, (curr, prev) => !curr || shallowEqual(curr, prev))

  // 向外暴露方法
  useImperativeHandle(ref, () => handleUpdate, [handleUpdate])

  return {
    $extra,
    offset,
    hasError,
    returnEmpty: returnEarly,
    handleGroupExited,
  }
}
