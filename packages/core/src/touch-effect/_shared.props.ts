export interface TouchEffectInfo {
  /**
   * @zh-CN 组件名称
   */
  component: string
  /**
   * @zh-CN 容器元素
   */
  container: HTMLElement
  /**
   * @zh-CN 事件
   */
  event: MouseEvent
  prefixCls: string
  target: HTMLElement | null
}
