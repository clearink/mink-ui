import type { NotificationItemProps } from '../notification-item.props'

import { useEffect } from 'react'

import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { useNotificationItemClassNames } from './use-class-names'

export function useNotificationItemProps(props: NotificationItemProps) {
  const {
    rootCssAttrs,
    rootCssNames,
    rootHovering,
    config,
    onDismiss,
  } = props
  const { onClose } = config

  const { ns, classNames } = useNotificationItemClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      rootCssNames,
      classNames,
      config.classNames,
      { root: config.className },
    ],
    [
      rootCssAttrs,
      config.styles,
      { root: config.style },
    ],
    { omitted: props },
  )

  const [itemHovering, setItemHovering] = useExactState(rootHovering)

  const handleOnMouseEnter = () => { setItemHovering(true) }
  const handleOnMouseLeave = () => { setItemHovering(false) }

  const handleCloseOnClick = () => { onClose?.(); onDismiss(config.key!) }

  // useEffect(() => {
  //   if (rootHovering) {
  //     handlePauseTimer()
  //   }
  //   else if (!itemHovering) {
  //     handleResumeTimer()
  //   }
  // }, [rootHovering, itemHovering])

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleCloseOnClick,
  }
}
