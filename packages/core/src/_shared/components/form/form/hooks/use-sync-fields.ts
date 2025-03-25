import { useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'

import type { InternalHooksReturn } from '../control/props'
import type { InternalFormProps } from '../props'

// 同步 fields 字段
export default function useSyncFields<State = any>(
  internalHooks: InternalHooksReturn<State>,
  fields: InternalFormProps['fields'],
) {
  const prevFields = useRef(fields)

  useEffect(() => {
    if (fields && !isEqual(prevFields.current, fields)) {
      internalHooks.setFields(fields)
    }
    prevFields.current = fields
  }, [fields, internalHooks])
}
