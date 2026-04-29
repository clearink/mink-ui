import type { InternalFormSchedulerProps } from './form-scheduler.props'

import { useImperativeHandle, useLayoutEffect, useState } from 'react'
import { noop } from '@mink-ui/shared/function/noop'

import { defineName } from '../../../utils/define-name'

function InternalFormScheduler(props: InternalFormSchedulerProps) {
  const { ref } = props

  const [handler, setHandler] = useState(() => noop)

  useImperativeHandle(ref, () => (callback) => { setHandler(() => callback) }, [])

  useLayoutEffect(() => { handler() }, [handler])

  return null
}

defineName(InternalFormScheduler, 'InternalForm.Scheduler')

export default InternalFormScheduler
