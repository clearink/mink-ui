export class ScrollNumberControl {
  private _items = new Map<string | null, HTMLSpanElement>()

  /**
   * @description 收集元素
   */
  public collect = (el: HTMLSpanElement | null, natural: string) => {
    if (el) this._items.set(natural, el)
    else this._items.delete(natural)
  }

  /**
   * @description 解析 css 样式
   */
  public resolve = (key: string | null) => {
    const element = this._items.get(key)

    if (!element) return

    const dy = -element.offsetTop

    return { transform: `translate3d(0, ${dy}px, 0)` }
  }
}
