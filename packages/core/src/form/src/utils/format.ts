import type { ReactNode } from 'react'
import type { InternalFormListContext, MetaChangeEvent } from '../../../_shared/components/form/src'
import type { FormPropsContextState } from '../_shared.context'
import type { ValidateStatus } from '../_shared.props'
import type { OmittedFormItemProps } from '../form-item.props'

import { isValidElement } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'
import { fallback } from '@mink-ui/shared/function/fallback'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { rawType } from '@mink-ui/shared/object/raw-type'

import { normalizeIsListField } from '../../../_shared/components/form/src'

/**
 * @description 格式化 提示信息
 */
export function formatExplains(type: string, items: ReactNode[], status?: ValidateStatus) {
  return items.map((item, index) => ({
    key: isValidElement(item) ? `${item.key}-${item.type}-${type}-${index}` : `${item}-${rawType(item)}`,
    status: fallback(status, type),
    value: item,
  }))
}

/**
 * @description 格式化 唯一id
 */
export function formatFormItemId(
  omitted: OmittedFormItemProps,
  propsContext: FormPropsContextState,
  listContext: ReturnType<typeof InternalFormListContext.use>,
) {
  const { name: formName } = propsContext

  const arrayName = toArray(omitted.name)

  const isListField = normalizeIsListField(omitted, listContext, arrayName)

  // TODO: 这里可能需要向外暴露出去
  const itemName = isListField ? isListField.listName.concat(arrayName) : arrayName

  const id = itemName.join('_')

  if (!id) return undefined

  return isNullish(formName) ? id : `${formName}_${id}`
}

/**
 * @description 标准化 校验状态
 */
export function normalizeValidateStatus(
  metaInfo: MetaChangeEvent,
  omitted: OmittedFormItemProps,
  defaultValue: ValidateStatus,
) {
  const { validateStatus: status, hasFeedback } = omitted

  if (!isNullish(status)) return status

  if (metaInfo.validating) return 'validating'

  if (metaInfo.warnings.length) return 'warning'

  if (metaInfo.errors.length) return 'error'

  if (metaInfo.touched) return 'success'

  if (hasFeedback && metaInfo.validated) return 'success'

  return defaultValue
}
