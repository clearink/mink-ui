import { now } from './raf'
import { getClientCoords } from './rect'

const SCALE = Symbol.for('_$mink-shared-element-scale$_')

interface ScaledValues {
  sx: number
  sy: number
  ts: number
}

export interface ScaledElement extends HTMLElement {
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
    position: absolute; top: 0; left: 0;
    overflow: visible; visibility: hidden;
    width: ${size}px; height: ${size}px;
  `
  element.appendChild(div)

  const coords = getClientCoords(div)

  element.removeChild(div)

  const result = {
    sx: (coords.width / size) || 1,
    sy: (coords.height / size) || 1,
  }

  element[SCALE] = { ...result, ts: now() }

  return result
}
