import { now } from './raf'
import { getClientCoords } from './rect'

const SCALE = Symbol.for('_$mink-shared-element-scale$_')

interface ScaledValues {
  sx: number
  sy: number
  ts: number
}

interface ScaledElement extends HTMLElement {
  [SCALE]?: ScaledValues
}

/**
 * @description 获取元素的缩放比例，避免性能问题，添加缓存功能
 */
export function getElementScale(element: ScaledElement, ttl: number) {
  const cached = element[SCALE]

  if (cached && now() - cached.ts < ttl) return cached

  const size = 1e5

  const div = document.createElement('div')

  // 绝对定位 && 禁止滚动条 && 视觉隐藏
  div.style.cssText = `
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: ${size}px !important;
    height: ${size}px !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    pointer-events: none !important;
    overflow: visible !important;
    visibility: hidden !important;
    box-sizing: content-box !important;
  `
  element.appendChild(div)

  const coords = getClientCoords(div)

  element.removeChild(div)

  const sx = coords.width / size

  const sy = coords.height / size

  const result = {
    sx: Number.isNaN(sx) ? 1 : sx,
    sy: Number.isNaN(sy) ? 1 : sy,
  }

  element[SCALE] = { ...result, ts: now() }

  return result
}
