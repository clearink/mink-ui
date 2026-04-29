import type { InternalFormListContextState } from '../_shared.context'
import type { ExternalFieldName, GetFieldsValueOptions, InternalFieldName } from '../_shared.props'
import type { GeneratedFormFieldProps, InternalFormFieldProps } from '../form-field.props'

import { isArray } from '@mink-ui/shared/is/is-array'
import { isBoolean } from '@mink-ui/shared/is/is-boolean'
import { isObject } from '@mink-ui/shared/is/is-object'

export function normalizeGetFieldsValueOptions(
  nameList?: ExternalFieldName[] | GetFieldsValueOptions | true,
  filter?: GetFieldsValueOptions['filter'],
) {
  if (nameList === true || isArray(nameList)) {
    return [nameList, filter] as const
  }

  if (isObject(nameList)) {
    return [undefined, nameList.filter] as const
  }

  return [undefined, undefined] as const
}

export function normalizeIsFieldsTouchedOptions(
  nameList?: boolean | ExternalFieldName[],
  allFieldsTouched?: boolean,
) {
  return isBoolean(nameList)
    ? [undefined, !!nameList] as const
    : [nameList, !!allFieldsTouched] as const
}

export function normalizeValidateFieldsOptions(_nameList?: ExternalFieldName[]) {
  return [_nameList] as const
}

/**
 * @description 格式化 isListField
 */
export function normalizeIsListField<V>(
  props: GeneratedFormFieldProps<V>,
  listContext: InternalFormListContextState | null,
  arrayName: InternalFieldName,
): InternalFormFieldProps['isListField'] {
  const { isListField: _isListField } = props

  // 没有 listContext || 明确表示不是 list field
  if (!listContext || _isListField === false) return false

  // List 不存在 name || 自身没有 name
  if (!listContext.listName.length || !arrayName.length) return false

  // 确定 type
  return { type: arrayName.length > 1 ? 'complex' : 'simple', ...listContext }
}
