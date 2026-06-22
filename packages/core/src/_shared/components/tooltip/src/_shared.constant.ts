export const TOOLTIP_MARK = Symbol.for('_$mink-tooltip$_')

// tooltip 嵌套时传入到 anchor 上的事件名称
export const injectedAnchorHandlerNames = [
  'onMouseEnter',
  'onMouseLeave',
  'onClick',
  'onBlur',
  'onFocus',
  'onContextMenu',
]

export const units = (() => {
  const unit = 8

  return {
    base: unit,
    sqrt: Math.sqrt(2) * unit / 2,
    gapx: unit - 2,
    gapy: unit / 2,
    offset: unit / 2,
    effect: unit / 2,
  }
})()
