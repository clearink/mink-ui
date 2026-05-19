import type { ExternalFieldName, ExternalFormInstance, InternalFormInstance } from '../_shared.props'

import { use, useEffect, useMemo, useState } from 'react'
import { arrayEqual } from '@mink-ui/shared/array/array-equal'
import { toArray } from '@mink-ui/shared/array/to-array'

import { useComputed } from '../../../../hooks/use-computed'
import { logger } from '../../../../utils/logger'
import { HOOKS_SECRET } from '../_shared.constant'
import { InternalFormInstanceContext } from '../_shared.context'
import { getIn } from '../utils/path'

export function useWatch<T>(name: ExternalFieldName, form?: ExternalFormInstance) {
  const [value, setValue] = useState<T | undefined>(undefined)

  const formInstance = (form || use(InternalFormInstanceContext)) as InternalFormInstance

  const internalHooks = useMemo(() => formInstance.getInternalHooks(HOOKS_SECRET), [formInstance])

  const fieldName = useComputed(() => toArray(name), toArray(name), arrayEqual)

  if (process.env.NODE_ENV !== 'production') {
    if (!formInstance) {
      logger.error('Internal.useWatch', 'useWatch requires a form instance since it can not auto detect from context.')
    }
  }

  // TODO: 增加 compare 逻辑，让用户自行比较
  useEffect(() => internalHooks?.registerWatch((values) => {
    setValue(getIn(values, fieldName))
  }), [fieldName, formInstance, internalHooks, setValue])

  return value
}
