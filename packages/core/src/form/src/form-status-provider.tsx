import type { FormItemStatusContextState } from './_shared.context'
import type { FormInputProviderProps } from './form-status-provider.props'

import { useMemo } from 'react'

import { FormItemStatusContext } from './_shared.context'

export function FormStatusProvider(props: FormInputProviderProps) {
  const { children, name: itemName } = props

  // 父级 context
  // const topFormItemStatusContext = FormItemStatusContext.use()

  const formItemStatusContextValue = useMemo<FormItemStatusContextState>(() => {
    return {
      // 默认在 Form.Item 下的组件的状态都受其控制
      controlled: true,
      name: itemName,
    }
  }, [itemName])

  return (
    <FormItemStatusContext value={formItemStatusContextValue}>
      {children}
    </FormItemStatusContext>
  )
}
