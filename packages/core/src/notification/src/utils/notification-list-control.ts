import type { VoidFn } from '@mink-ui/shared/interface'
import type { GroupTransitionInstance } from '../../../_shared/components/transition/src/group-transition.props'
import type { UniqueKey } from '../../../_shared/types/unique-key'
import type { NotificationItemMethodParams } from '../notification-item.props'

export class NotificationListControl {
  public $container = { current: null as HTMLDivElement | null }

  public $group = { current: null as GroupTransitionInstance | null }

  public $sizes = new Map<UniqueKey, { width: number, height: number }>()

  public get container() {
    return this.$container.current
  }

  public get group() {
    return this.$group.current
  }

  public constructor(public forceUpdate: VoidFn) {}

  private delete = (key: UniqueKey) => {
    if (!this.$sizes.has(key)) return

    this.$sizes.delete(key)

    this.$sizes = new Map(this.$sizes)

    this.forceUpdate()
  }

  private append = (el: HTMLElement, key: UniqueKey) => {
    const { offsetHeight: height, offsetWidth: width } = el

    const cache = this.$sizes.get(key)

    if (cache && cache.height === height && cache.width === width) return

    this.$sizes.set(key, { height, width })

    this.$sizes = new Map(this.$sizes)

    this.forceUpdate()
  }

  public collect = (el: HTMLElement | null, item: NotificationItemMethodParams) => {
    if (!el) this.delete(`${item.key}`)
    else this.append(el, `${item.key}`)
  }
}
