import type { InternalTooltipProps } from './tooltip.props'

import { cn } from '../../../libs/cn'
import { defineName } from '../../../utils/define-name'
import Overlay from '../../overlay/src/overlay'
import ShouldUpdate from '../../should-update/src'
import { InternalTooltipContext } from './_shared.context'
import { useInternalTooltipProps } from './hooks/use-tooltip-props'
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
    popupEvents,
    triggerEvents,
    returnEmpty,
    handleResize,
    handleScroll,
    handleEnqueue,
  } = useInternalTooltipProps(props)

  const { arrow } = picked
  const {
    children,
    content,
    fresh,
    transition,
    mountOnEnter,
    unmountOnExit,
    zIndex,
    getContainer,
  } = omitted

  if (returnEmpty) return null

  return (
    <>
      <TooltipTrigger
        ref={control.$trigger}
        events={triggerEvents}
        isOpen={isOpen}
        onResize={handleResize}
        onScroll={handleScroll}
      >
        {children}
      </TooltipTrigger>

      <Overlay
        style={{ left: 0, top: 0 }}
        resumeOnCancel
        getContainer={getContainer}
        isOpen={isOpen}
        mask={false}
        mountOnEnter={mountOnEnter}
        transitions={{ content: transition }}
        unmountOnExit={unmountOnExit}
        zIndex={zIndex}
      >
        {($motion, getters) => {
          return (
            <TooltipContent
              isOpen={isOpen}
              onMounted={handleEnqueue}
              onResize={handleResize}
              onScroll={handleScroll}
            >
              <div
                ref={control.$popup}
                className={cssNames.wrapper}
                style={cssAttrs.wrapper}
              >
                <div
                  ref={$motion}
                  className={cn(cssNames.root, getters.names())}
                  style={{ ...cssAttrs.root, ...getters.attrs() }}
                  {...popupEvents}
                >
                  {!!arrow && <div className={cssNames.arrow} style={cssAttrs.arrow} />}

                  <InternalTooltipContext value={handleEnqueue}>
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
