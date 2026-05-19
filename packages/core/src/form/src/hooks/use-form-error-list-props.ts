import type { FormErrorListProps } from '../form-error-list.props'

import { useMemo } from 'react'
import { pushItem } from '@mink-ui/shared/array/push-item'

import { useDebounceValue } from '../../../_shared/hooks/use-debounce'
import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { isRenderable } from '../../../_shared/utils/renderable'
import { ErrorListContext } from '../_shared.context'
import { formatExplains } from '../utils/format'

export function useFormErrorListProps(props: FormErrorListProps) {
  const { outerNamespace: ons } = ErrorListContext.use()

  const {
    warnings: _warnings = [],
    errors: _errors = [],
    help,
    helpStatus,
  } = props

  const ns = useNamespace(preset => `${ons || `${preset}-form-item`}__explain`)

  const warnings = useDebounceValue(_warnings.length ? 20 : 0, _warnings)

  const errors = useDebounceValue(_errors.length ? 20 : 0, _errors)

  const explains = useMemo(() => {
    if (isRenderable(help)) return formatExplains('help', [help], helpStatus)

    return pushItem(formatExplains('error', errors), formatExplains('warning', warnings))
  }, [help, helpStatus, warnings, errors])

  return {
    omitted: props,
    ns,
    explains,
  }
}
