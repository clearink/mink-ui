import type { InternalTooltipProps } from './tooltip.props'

import { cn } from '../../../libs/cn'
import { defineName } from '../../../utils/define-name'
import Overlay from '../../overlay/src/overlay'
import ShouldUpdate from '../../should-update/src'
import { InternalTooltipContext } from './_shared.context'
import { useInternalTooltipProps } from './hooks/use-tooltip-props'
import TooltipAnchor from './tooltip-anchor'
import TooltipContent from './tooltip-content'

function InternalTooltip(props: InternalTooltipProps) {
  const {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    ctrl,
    isOpen,
    anchor,
    popupHandlers,
    anchorHandlers,
    overlayInherited,
    returnEmpty,
    handleEnqueue,
    handleTickedUpdate,
    handleFramedUpdate,
  } = useInternalTooltipProps(props)

  const { arrow } = picked
  const {
    children,
    content,
    fresh,
    transition,
  } = omitted

  if (returnEmpty) return null

  return (
    <>
      <TooltipAnchor
        ref={ctrl.$anchor}
        anchor={anchor}
        handlers={anchorHandlers}
        isOpen={isOpen}
        onFramedUpdate={handleFramedUpdate}
        onTickedUpdate={handleTickedUpdate}
      >
        {children}
      </TooltipAnchor>

      <Overlay
        {...overlayInherited}
        ref={ctrl.$overlay}
        style={{ left: 0, top: 0 }}
        skipBeginning
        isOpen={isOpen}
        mask={false}
        transitions={{ content: transition }}
      >
        {($motion, getters) => {
          return (
            <TooltipContent
              ctrl={ctrl}
              isOpen={isOpen}
              onEnqueue={handleEnqueue}
              onFramedUpdate={handleFramedUpdate}
              onTickedUpdate={handleTickedUpdate}
            >
              <div
                ref={ctrl.$popup}
                className={cssNames.popup}
                style={cssAttrs.popup}
              >
                <div
                  {...popupHandlers}
                  ref={$motion}
                  className={cn(cssNames.root, getters.names())}
                  style={{ ...cssAttrs.root, ...getters.attrs() }}
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
