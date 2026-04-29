export interface TouchEffectInfo {
  /**
   * @description 组件名称
   */
  component: Capitalize<string>

  /**
   * @description 容器元素
   */
  container: HTMLElement

  /**
   * @description 触发事件, 统一成 PointerEvent
   */
  event: MouseEvent | TouchEvent | PointerEvent

  /**
   * @description 样式类名
   */
  className?: string

  /**
   * @description 事件触发目标元素
   */
  target: HTMLElement | null
}
