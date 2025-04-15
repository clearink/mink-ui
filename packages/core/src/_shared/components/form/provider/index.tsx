import { batch, noop } from '@mink-ui/shared'
import { useMemo, useRef } from 'react'

import type { InternalFormProviderContextState } from '../_shared.context'
import type { Forms, InternalFormProviderProps } from './props'

import { betterDisplayName } from '../../../../_shared/utils'

// import FormProviderControl from './control'
import { InternalFormProviderContext } from '../_shared.context'

function FormProvider(props: InternalFormProviderProps) {
  // TODO: chore
  // const control = useConstant(() => new FormProviderControl())

  const forms = useRef<Forms>({})

  const parentContext = InternalFormProviderContext.useState()

  const formProviderContext = useMemo<InternalFormProviderContextState>(() => {
    return {
      register: batch(parentContext?.register, (form, name) => {
        if (!name) return noop

        forms.current[name] = form

        return () => { delete forms.current[name] }
      }),
      triggerFormChange: (name, changeFields) => {
        parentContext?.triggerFormChange(name, changeFields)
      },
      triggerFormFinish: (name, values) => {
        parentContext?.triggerFormFinish(name, values)
      },
    }
  }, [parentContext])

  return (
    <InternalFormProviderContext.Provider value={formProviderContext}>
      {props.children}
    </InternalFormProviderContext.Provider>
  )
}

betterDisplayName(FormProvider, 'InternalForm.Provider')

export default FormProvider
