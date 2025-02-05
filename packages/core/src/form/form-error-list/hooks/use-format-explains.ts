import { useDebounceValue } from '@mink-ui/core/_shared/hooks'
import { fallback, isNullish, pushItem, rawType } from '@mink-ui/shared'
import { type ReactNode, isValidElement, useMemo } from 'react'

import type { ValidateStatus } from '../../_shared.props'
import type { FormErrorListProps } from '../props'

function makeExplains(type: 'error' | 'help' | 'warning', items: ReactNode[], status?: ValidateStatus) {
  return items.map((item, index) => ({
    key: isValidElement(item) ? `${item.key}-${item.type}-${type}-${index}` : `${item}-${rawType(item)}`,
    status: fallback(status, type),
    value: item,
  }))
}

export default function useFormatExplains(props: FormErrorListProps) {
  const { help, helpStatus, errors: _errors, warnings: _warnings } = props

  const errors = useDebounceValue(40, _errors || [])

  const warnings = useDebounceValue(40, _warnings || [])

  return useMemo(() => {
    if (!isNullish(help)) return makeExplains('help', [help], helpStatus)

    return pushItem(makeExplains('error', errors), makeExplains('warning', warnings))
  }, [errors, help, helpStatus, warnings])
}
