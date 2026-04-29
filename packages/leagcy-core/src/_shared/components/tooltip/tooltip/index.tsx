import type { InternalToolTipContextState } from '../_shared.context'
import type { InternalTooltipProps } from './props'

import { useMemo } from 'react'

import { batch, noop, pushItem, removeItem } from '@mink-ui/shared'

import Overlay from '../../overlay'
import ShouldUpdate from '../../should-update'
import { useSemanticStyles, useThrottleFrame, useThrottleTick } from '../../../hooks'
import { betterDisplayName, cls, withDefaults } from '../../../utils'
import { InternalToolTipContext } from '../_shared.context'
import TooltipArrow from '../tooltip-arrow'
import TooltipContent from '../tooltip-content'
import TooltipTrigger from '../tooltip-trigger'
import useTooltip from './hooks/use-tooltip'
import useTooltipEvents from './hooks/use-tooltip-events'
import useTooltipOpen from './hooks/use-tooltip-open'
import useWatchCoords from './hooks/use-watch-coords'
import { defaultInternalTooltipProps } from './props'

function InternalTooltip(_props: InternalTooltipProps) {
  const props = withDefaults(_props, defaultInternalTooltipProps)

  const {
    arrow,
    trigger,
    children,
    className,
    classNames = {},
    content,
    fresh,
    getContainer,
    keepMounted,
    transition,
    unmountOnExit,
    // overlay
    zIndex,
  } = props

  const parentContext = InternalToolTipContext.useState()

  const styles = useSemanticStyles(props)

  const { refs, arrowCoords, popupCoords, updateCoords } = useTooltip()

  const [isOpen, setIsOpen] = useTooltipOpen(props)

  const tooltipContext = useMemo<InternalToolTipContextState>(() => {
    return batch(parentContext, (el: Element | null) => {
      if (!el) return noop

      pushItem(refs.chain, el)

      return () => { removeItem(refs.chain, el) }
    })
  }, [refs, parentContext])

  const [triggerEvents, popupEvents] = useTooltipEvents({ refs, trigger, setIsOpen })

  const onUpdate = () => { isOpen && updateCoords(props) }

  useWatchCoords(props, onUpdate)

  const handleResize = useThrottleTick(onUpdate)

  const handleScroll = useThrottleFrame(onUpdate)

  return (
    <>
      <TooltipTrigger
        ref={refs.$trigger}
        events={triggerEvents}
        isOpen={isOpen}
        onResize={handleResize}
        onScroll={handleScroll}
      >
        {children}
      </TooltipTrigger>

      <Overlay
        style={{ left: 0, top: 0 }}
        getContainer={getContainer}
        isOpen={isOpen}
        keepMounted={keepMounted}
        mask={false}
        transitions={{ content: transition }}
        unmountOnExit={unmountOnExit}
        zIndex={zIndex}
      >
        {(motion, transitionClass) => {
          return (
            <TooltipContent
              isOpen={isOpen}
              onMounted={tooltipContext}
              onResize={handleResize}
              onScroll={handleScroll}
            >
              <div
                ref={refs.$popup}
                className={classNames.wrapper}
                style={{ ...styles.wrapper, ...popupCoords }}
              >
                <div
                  ref={motion}
                  className={cls(className, classNames.root, transitionClass)}
                  style={styles.root}
                  {...popupEvents}
                >
                  <TooltipArrow
                    className={classNames.arrow}
                    style={{ ...styles.arrow, ...arrowCoords }}
                    show={!!arrow}
                  />
                  <InternalToolTipContext value={tooltipContext}>
                    <ShouldUpdate when={isOpen || !!fresh}>{content}</ShouldUpdate>
                  </InternalToolTipContext>
                </div>
              </div>
            </TooltipContent>
          )
        }}
      </Overlay>
    </>
  )
}

betterDisplayName(InternalTooltip)

export default InternalTooltip
