export const TOOLTIP_MARK = Symbol.for('_$mink-tooltip$_')

// tooltip 嵌套时传入到 trigger 上的事件名称
export const injectedTriggerHandlerNames = [
  'onMouseEnter',
  'onMouseLeave',
  'onClick',
  'onBlur',
  'onFocus',
  'onContextMenu',
]
