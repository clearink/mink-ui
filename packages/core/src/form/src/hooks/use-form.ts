import type { FormInstance } from '../_shared.props'

import InternalForm from '../../../_shared/components/form/src'

export function useForm<S = any>(form?: FormInstance<S>) {
  const formInstance = InternalForm.useForm<S>(form)

  return formInstance as FormInstance<S>
}
