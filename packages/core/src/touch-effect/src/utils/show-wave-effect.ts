import type { TouchEffectInfo } from '../_shared.props'

import { ownerStyle } from '@mink-ui/shared/dom/global'
import { getClientCoords } from '@mink-ui/shared/dom/rect'
import { makeTimeout } from '@mink-ui/shared/dom/timer'

import { resizeMonitor as monitor } from '../../../_shared/hooks/use-observer/utils/singleton'
import { findNonStaticElement } from '../../../_shared/utils/element'

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

  if (!target) return

  const waveColor = getWaveColor(target)

  if (!waveColor) return

  const div = document.createElement('div')

  div.style.cssText = `
    position: absolute; top: 0; left: 0;
    --wave-color: ${waveColor}; 
    box-shadow: 0 0 0 0 var(--wave-color);
  `

  className && div.classList.add(className)

  const resize = () => {
    const wrapper = findNonStaticElement(div)

    const targetStyles = ownerStyle(target)

    const wrapperStyles = ownerStyle(wrapper)

    const targetCoords = getClientCoords(target)

    const wrapperCoords = getClientCoords(wrapper)

    const offsetX = Number.parseFloat(wrapperStyles.borderLeftWidth) || 0

    const offsetY = Number.parseFloat(wrapperStyles.borderTopWidth) || 0

    const dx = targetCoords.left - wrapperCoords.left - offsetX

    const dy = targetCoords.top - wrapperCoords.top - offsetY

    div.style.width = targetStyles.width

    div.style.height = targetStyles.height

    div.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
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
