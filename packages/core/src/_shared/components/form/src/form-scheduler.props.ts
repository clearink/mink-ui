import type { RefCallback } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'

export type ScheduleCallback = (handler: VoidFn) => void

export interface InternalFormSchedulerProps {
  ref: RefCallback<ScheduleCallback>
}
