import type { NotificationItemProps } from '../notification-item.props'

import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useMergeRefs } from '../../../_shared/hooks/use-merge-refs'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useNotificationItemClassNames } from './use-class-names'

export function useNotificationItemProps(props: NotificationItemProps) {
  const {
    ref,
    config,
    getters,
    listHovering,
    outerCssNames,
    outerCssAttrs,
    outerCssVars,
    onCollect,
    onDismiss,
  } = props
  const { onClose } = config

  const { ns, classNames } = useNotificationItemClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      outerCssNames,
      classNames,
      config.classNames,
      { root: config.className },
      { root: getters.names() },
    ],
    [
      outerCssAttrs,
      config.styles,
      { root: config.style },
      { root: outerCssVars },
      { root: getters.attrs() },
    ],
    { omitted: props },
  )

  const [itemHovering, setItemHovering] = useExactState(listHovering)

  const mergedRef = useMergeRefs(ref, (el) => { onCollect(el, config) })

  const handleOnMouseEnter = () => { setItemHovering(true) }
  const handleOnMouseLeave = () => { setItemHovering(false) }

  const handleCloseOnClick = () => { onClose?.(); onDismiss(config.key!) }

  // useEffect(() => {
  //   if (listHovering) {
  //     handlePauseTimer()
  //   }
  //   else if (!itemHovering) {
  //     handleResumeTimer()
  //   }
  // }, [listHovering, itemHovering])

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    mergedRef,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleCloseOnClick,
  }
}
