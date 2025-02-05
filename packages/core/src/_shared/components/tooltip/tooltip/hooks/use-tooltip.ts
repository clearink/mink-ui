import { useConstant, useEvent, useExactState } from '@mink-ui/core/_shared/hooks'

import type { ArrowCoords, InternalTooltipProps, PopupCoords } from '../props'

import aligners from '../utils/aligner'

export class TooltipRefs {
  $popup = { current: null as HTMLDivElement | null }

  $trigger = { current: null as HTMLDivElement | null }

  chain: Element[] = []

  get popup() {
    return this.$popup.current
  }

  get trigger() {
    return this.$trigger.current
  }
}

export default function useTooltip() {
  const refs = useConstant(() => new TooltipRefs())

  const [arrowCoords, setArrowCoords] = useExactState<Partial<ArrowCoords>>({
    transform: `translate3d(0, 0, 0) rotate(0)`,
  })

  const [popupCoords, setPopupCoords] = useExactState<Partial<PopupCoords>>({
    transform: `translate3d(-1000vw, -1000vh, 0)`,
  })

  const updateCoords = useEvent((props: InternalTooltipProps) => {
    const { placement } = props

    const { popup, trigger } = refs

    if (!popup || !trigger) return

    const getCoords = aligners[placement!] || aligners.top

    const [getArrowCoords, getPopupCoords] = getCoords(props, popup, trigger)

    setArrowCoords(getArrowCoords(arrowCoords))

    setPopupCoords(getPopupCoords(popupCoords))
  })

  return {
    refs,
    arrowCoords,
    setArrowCoords,
    popupCoords,
    setPopupCoords,
    updateCoords,
  }
}
