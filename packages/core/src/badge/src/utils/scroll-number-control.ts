import { getClientCoords } from '@mink-ui/shared/dom/rect'

export class ScrollNumberControl {
  public $wrapper = { current: null as HTMLDivElement | null }

  public items = new Map<string | null, HTMLSpanElement>()

  public get wrapper() {
    return this.$wrapper.current
  }

  /**
   * @description 解析 css 样式
   */
  public resolve = (item: HTMLElement) => {
    const wrapCoords = getClientCoords(this.wrapper!)
    const itemCoords = getClientCoords(item)

    const delta = wrapCoords.top - itemCoords.top

    const value = `translate3d(0, ${delta}px, 0)`

    return { transform: value }
  }
}
