import type { InternalTooltipProps } from './tooltip.props'

import { cn } from '../../../libs/cn'
import { defineName } from '../../../utils/define-name'
import Overlay from '../../overlay/src/overlay'
import ShouldUpdate from '../../should-update/src'
import { InternalTooltipContext } from './_shared.context'
import { useInternalTooltipProps } from './hooks/use-tooltip-props'
import TooltipArrow from './tooltip-arrow'
import TooltipContent from './tooltip-content'
import TooltipTrigger from './tooltip-trigger'

function InternalTooltip(props: InternalTooltipProps) {
  const {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    control,
    isOpen,
    arrowCoords,
    popupCoords,
    popupEvents,
    triggerEvents,
    overlayProps,
    returnEmpty,
    handleOnEnqueue,
    handleOnResize,
    handleOnScroll,
  } = useInternalTooltipProps(props)

  const { arrow } = picked
  const { children, content, fresh, transition } = omitted

  if (returnEmpty) return null

  return (
    <>
      <TooltipTrigger
        ref={control.$trigger}
        events={triggerEvents}
        isOpen={isOpen}
        onResize={handleOnResize}
        onScroll={handleOnScroll}
      >
        {children}
      </TooltipTrigger>

      <Overlay
        {...overlayProps}
        style={{ left: 0, top: 0 }}
        isOpen={isOpen}
        mask={false}
        transitions={{ content: transition }}
      >
        {($motion, getters) => {
          return (
            <TooltipContent
              isOpen={isOpen}
              onMounted={handleOnEnqueue}
              onResize={handleOnResize}
              onScroll={handleOnScroll}
            >
              <div
                ref={control.$popup}
                className={cssNames.wrapper}
                style={{ ...cssAttrs.wrapper, ...popupCoords }}
              >
                <div
                  ref={$motion}
                  className={cn(cssNames.root, getters.names())}
                  style={{ ...cssAttrs.root, ...getters.attrs() }}
                  {...popupEvents}
                >
                  <TooltipArrow
                    className={cssNames.arrow}
                    style={{ ...cssAttrs.arrow, ...arrowCoords }}
                    show={!!arrow}
                  />

                  <InternalTooltipContext value={handleOnEnqueue}>
                    <ShouldUpdate when={() => isOpen || !!fresh}>{content}</ShouldUpdate>
                  </InternalTooltipContext>
                </div>
              </div>
            </TooltipContent>
          )
        }}
      </Overlay>
    </>
  )
}

defineName(InternalTooltip)

export default InternalTooltip
