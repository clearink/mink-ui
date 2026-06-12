import type { InternalFormSchedulerProps } from './form-scheduler.props'

import { useImperativeHandle, useState } from 'react'
import { noop } from '@mink-ui/shared/function/noop'

import { useIsomorphicEffect } from '../../../hooks/use-isomorphic-effect'
import { defineName } from '../../../utils/define-name'

function InternalFormScheduler(props: InternalFormSchedulerProps) {
  const { ref } = props

  const [handler, setHandler] = useState(() => noop)

  useImperativeHandle(ref, () => (callback) => { setHandler(() => callback) }, [])

  useIsomorphicEffect(() => { handler() }, [handler])

  return null
}

defineName(InternalFormScheduler, 'InternalForm.Scheduler')

export default InternalFormScheduler
