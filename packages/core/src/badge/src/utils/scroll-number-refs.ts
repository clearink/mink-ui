export class ScrollNumberRefs {
  public $wrapper = { current: null as HTMLDivElement | null }

  public $items = new Map<string | null, HTMLSpanElement>()

  public get wrapper() {
    return this.$wrapper.current
  }

  public get items() {
    return this.$items
  }
}
