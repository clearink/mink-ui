import type { InternalFormSharedProps } from './form-shared.props'

import { useMemo } from 'react'

import { defineName } from '../../../utils/define-name'
import { InternalFormSharedContext } from './_shared.context'

function InternalFormShared(props: InternalFormSharedProps) {
  const { children, validateMessages } = props

  const topShardContext = InternalFormSharedContext.use()

  const sharedContextValue = useMemo(() => ({
    validateMessages: {
      ...topShardContext?.validateMessages,
      ...validateMessages,
    },
  }), [topShardContext?.validateMessages, validateMessages])

  return (
    <InternalFormSharedContext value={sharedContextValue}>
      {children}
    </InternalFormSharedContext>
  )
}

defineName(InternalFormShared, 'InternalForm.Shared')

export default InternalFormShared
