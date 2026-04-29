import { FormInstanceContext } from '../_shared.context'

export function useFormInstance() {
  return FormInstanceContext.use()
}
