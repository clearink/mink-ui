import type { TouchEffectInfo } from '../_shared.props'

import { ownerComputedStyle } from '@mink-ui/shared/dom/global'
import { getClientCoords } from '@mink-ui/shared/dom/rect'
import { makeTimeout } from '@mink-ui/shared/dom/timer'

import observer from '../../../_shared/hooks/use-observer/utils/observer'
import { findNonStaticElement } from '../../../_shared/utils/element'

// 白色，透明 不合格
function isValidColor(color: string) {
  const matches = color.split(/[(rgba?()),\s]/g).filter(Boolean)

  if (matches.length === 3) return !['255,255,255'].includes(matches.join(','))

  if (matches.length === 4) return matches[3] !== '0'

  return false
}

function getWaveColor(node: HTMLElement) {
  const { backgroundColor, borderColor, borderTopColor } = ownerComputedStyle(node)

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

  div.style.setProperty('position', 'absolute')

  div.style.setProperty('--wave-color', waveColor)

  div.style.setProperty('box-shadow', '0 0 0 0 var(--wave-color)')

  div.classList.add(className || '')

  const resize = () => {
    const targetCoords = getClientCoords(target)

    const wrapperCoords = getClientCoords(findNonStaticElement(div))

    div.style.height = `${targetCoords.height}px`

    div.style.width = `${targetCoords.width}px`

    const dx = targetCoords.left - wrapperCoords.left

    const dy = targetCoords.top - wrapperCoords.top

    div.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
  }

  const disconnect = observer.observe(target, resize)

  const destroy = () => { disconnect(); div.remove() }

  div.addEventListener('animationstart', resize)

  div.addEventListener('animationend', destroy)

  makeTimeout(2000, destroy)

  target.insertBefore(div, target.firstChild)
}
