import type { ExternalFieldName, ExternalFormInstance, InternalFormInstance } from '../_shared.props'

import isEqual from 'react-fast-compare'
import { use, useEffect, useMemo } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'

import { useComputed } from '../../../../hooks/use-computed'
import { useExactState } from '../../../../hooks/use-exact-state'
import { logger } from '../../../../utils/logger'
import { HOOKS_SECRET } from '../_shared.constant'
import { InternalFormInstanceContext } from '../_shared.context'
import { getIn } from '../utils/path'

export function useWatch<T>(name: ExternalFieldName, form?: ExternalFormInstance) {
  const [value, setValue] = useExactState<T | undefined>(undefined)

  const formInstance = (form || use(InternalFormInstanceContext)) as InternalFormInstance

  const internalHooks = useMemo(() => formInstance.getInternalHooks(HOOKS_SECRET), [formInstance])

  const fieldName = useComputed({
    deps: toArray(name),
    compare: isEqual,
    factory: () => toArray(name),
  })

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
