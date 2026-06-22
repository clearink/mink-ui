import type { TouchEffectInfo } from '../_shared.props'

import { ownerDocument, ownerStyle } from '@mink-ui/shared/dom/global'
import { makeTimeout } from '@mink-ui/shared/dom/timer'

import { resizeMonitor as monitor } from '../../../_shared/hooks/use-observer/utils/singleton'
import { findContainBlock } from '../../../_shared/utils/element'

// 白色，透明 不合格
function isValidColor(color: string) {
  const matches = color.split(/[(rgba?()),\s]/g).filter(Boolean)

  if (matches.length === 3) return !['255,255,255'].includes(matches.join(','))

  if (matches.length === 4) return matches[3] !== '0'

  return false
}

function getWaveColor(node: HTMLElement) {
  const { backgroundColor, borderColor, borderTopColor } = ownerStyle(node)

  if (isValidColor(borderTopColor)) return borderTopColor

  if (isValidColor(borderColor)) return borderColor

  if (isValidColor(backgroundColor)) return backgroundColor
}

export default function showWaveEffect(info: TouchEffectInfo) {
  const { className, target } = info

  const waveColor = target ? getWaveColor(target) : undefined

  if (!target || !waveColor) return

  const div = document.createElement('div')

  div.style.cssText = `
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    pointer-events: none !important;
    --wave-color: ${waveColor} !important
  `
  className && div.classList.add(className)

  const resize = () => {
    const contain = findContainBlock(div)

    const isContain = contain === target

    const { width, height, borderLeftWidth, borderTopWidth } = ownerStyle(target)

    const bl = Number.parseFloat(borderLeftWidth) || 0

    const bt = Number.parseFloat(borderTopWidth) || 0

    const dx = isContain ? -bl : target.offsetLeft

    const dy = isContain ? -bt : target.offsetTop

    div.style.setProperty('width', width, 'important')

    div.style.setProperty('height', height, 'important')

    div.style.setProperty('transform', `translate3d(${dx}px, ${dy}px, 0)`, 'important')
  }

  const unsubscribe = monitor.subscribe()

  const deactivate = monitor.activate(target, resize)

  const destroy = () => { unsubscribe?.(); deactivate?.(); div.remove() }

  div.addEventListener('animationstart', resize)

  div.addEventListener('animationend', destroy)

  div.addEventListener('animationcancel', destroy)

  makeTimeout(2000, destroy)

  target.insertBefore(div, target.firstChild)
}
