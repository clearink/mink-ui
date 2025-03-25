import type { ExternalFormInstance } from '../control/props'

import { useConstant, useForceUpdate } from '../../../../../_shared/hooks'
import FormControl from '../control'

export default function useForm<S = any>(form?: ExternalFormInstance<S>) {
  const forceUpdate = useForceUpdate()

  return useConstant(() => form || new FormControl<S>(forceUpdate).injectForm())
}
