import { isArray, isBoolean, isObject } from '@mink-ui/shared'

import type { ExternalNamePath } from '../../_shared.props'
import type { GetFieldsValueConfig, GetFieldsValueFieldMetaFilter } from '../control/props'

export function normalizeGetFieldsValueOptions(
  _nameList?: ExternalNamePath[] | GetFieldsValueConfig | true,
  _filter?: GetFieldsValueFieldMetaFilter,
) {
  let strict = false
  let filter: GetFieldsValueFieldMetaFilter | undefined
  let nameList: ExternalNamePath[] | true | undefined

  if (_nameList === true || isArray(_nameList)) {
    nameList = _nameList
    filter = _filter
  }
  else if (isObject(_nameList)) {
    strict = !!_nameList.strict
    filter = _nameList.filter
  }

  return [strict, nameList, filter] as const
}

export function normalizeIsFieldsTouchedOptions(
  _nameList?: boolean | ExternalNamePath[],
  allFieldsTouched?: boolean,
) {
  let nameList: ExternalNamePath[] | undefined
  let checkEveryone: boolean = false

  if (isBoolean(_nameList)) {
    nameList = undefined
    checkEveryone = !!_nameList
  }
  else {
    checkEveryone = !!allFieldsTouched
    nameList = _nameList
  }

  return [nameList, checkEveryone] as const
}

export function normalizeValidateFieldsOptions(_nameList?: ExternalNamePath[]) {
  return [_nameList] as const
}
