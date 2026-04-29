import type { ExternalFormInstance } from '../_shared.props'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { FormControl } from '../utils/form-control'

export function useForm<S = any>(form?: ExternalFormInstance<S>) {
  const forceUpdate = useForceUpdate()

  return useConstant(() => form || new FormControl<S>(forceUpdate).inject())
}
