import type { FormListProps } from './form-list.props'

import { useMemo } from 'react'
import { pick } from '@mink-ui/shared/object/pick'

import InternalForm from '../../_shared/components/form/src'
import { useNamespace } from '../../_shared/hooks/use-settings/use-namespace'
import { defineName } from '../../_shared/utils/define-name'
import { ErrorListContext } from './_shared.context'

function FormList(props: FormListProps) {
  const { children, prefixCls } = props

  const ns = useNamespace('form', prefixCls)

  const errorListContextValue = useMemo(() => ({ rootNamespace: ns, status: 'error' as const }), [ns])

  return (
    <InternalForm.List {...props}>
      {(fields, helpers, metaInfo) => (
        <ErrorListContext value={errorListContextValue}>
          {children(fields, helpers, pick(metaInfo, ['warnings', 'errors']))}
        </ErrorListContext>
      )}
    </InternalForm.List>
  )
}

defineName(FormList, 'Form.List')

export default FormList
