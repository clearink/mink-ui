import type { ReactElement } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { GroupTransitionInstance } from '../../../_shared/components/transition/src/group-transition.props'

export class NotificationListControl {
  public $container = {
    current: null as HTMLDivElement | null,
  }

  public $group = {
    current: null as GroupTransitionInstance | null,
  }

  public $items = new Map<ReactElement['key'], HTMLElement>()

  public $hovers = new Set<ReactElement['key']>()

  public constructor(public forceUpdate: VoidFn) {}
}
