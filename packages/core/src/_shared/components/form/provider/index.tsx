import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { batch, noop } from '@mink-ui/shared'
import { useMemo, useRef } from 'react'

import type { InternalFormContextState } from '../_shared.context'
import type { Forms, InternalFormProviderProps } from './props'

// import FormProviderControl from './control'
import { InternalFormContext } from '../_shared.context'

function FormProvider(props: InternalFormProviderProps) {
  // TODO: chore
  // const control = useConstant(() => new FormProviderControl())

  const forms = useRef<Forms>({})

  const parentContext = InternalFormContext.useState()

  const formContext = useMemo<InternalFormContextState>(() => {
    return {
      register: batch(parentContext.register, (form, name) => {
        if (!name) return noop

        forms.current[name] = form

        return () => { delete forms.current[name] }
      }),
      triggerFormChange: parentContext.triggerFormChange,
      triggerFormFinish: parentContext.triggerFormFinish,
    }
  }, [parentContext])

  return (
    <InternalFormContext.Provider value={formContext}>
      {props.children}
    </InternalFormContext.Provider>
  )
}

betterDisplayName(FormProvider, 'InternalForm.Provider')

export default FormProvider
