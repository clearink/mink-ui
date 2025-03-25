import type { FormListProps } from './props'

import { Form as InternalForm } from '../../_shared/components'
import { betterDisplayName } from '../../_shared/utils'

function FormList(props: FormListProps) {
  return <InternalForm.List {...props} />
}

betterDisplayName(FormList, 'Form.List')

export default FormList
