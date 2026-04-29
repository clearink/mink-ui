import type { InternalFormProviderContextState } from './_shared.context'
import type { Forms, InternalFormProviderProps } from './form-provider.props'

import { useMemo, useRef } from 'react'
import { batch } from '@mink-ui/shared/function/batch'
import { noop } from '@mink-ui/shared/function/noop'

import { defineName } from '../../../utils/define-name'
import { InternalFormProviderContext } from './_shared.context'
import InternalFormSharedProvider from './form-shared'

function InternalFormProvider(props: InternalFormProviderProps) {
  const topProviderContext = InternalFormProviderContext.use()

  const { children, validateMessages, onFormChange, onFormFinish } = props

  const forms = useRef<Forms>({})

  const providerContextValue = useMemo<InternalFormProviderContextState>(() => {
    return {
      register: batch(topProviderContext?.register, (form, name) => {
        if (!name) return noop

        forms.current[name] = form

        return () => { delete forms.current[name] }
      }),
      triggerFormChange: (name, changedFields) => {
        onFormChange?.(name, { changedFields, forms: forms.current })

        topProviderContext?.triggerFormChange(name, changedFields)
      },
      triggerFormFinish: (name, values) => {
        onFormFinish?.(name, { values, forms: forms.current })

        topProviderContext?.triggerFormFinish(name, values)
      },
    }
  }, [onFormChange, onFormFinish, topProviderContext])

  return (
    <InternalFormProviderContext value={providerContextValue}>
      <InternalFormSharedProvider validateMessages={validateMessages}>
        {children}
      </InternalFormSharedProvider>
    </InternalFormProviderContext>
  )
}

defineName(InternalFormProvider, 'InternalForm.Provider')

export default InternalFormProvider
