import type { ScrollNumberProps } from '../scroll-number.props'

import { useState } from 'react'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useFlushState } from '../../../_shared/hooks/use-exact-state'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { ScrollNumberControl } from '../utils/scroll-number-control'
import { useScrollNumberClassNames } from './use-class-names'

export function useScrollNumberProps(props: ScrollNumberProps) {
  const { char } = props

  const ctrl = useConstant(() => new ScrollNumberControl())

  const [history, setHistory] = useFlushState (() => [null, char])

  const [isShowChar, setIsShowChar] = useState(true)

  const { ns, classNames } = useScrollNumberClassNames(props)

  const handleEnter = () => {
    const from = ctrl.items.get(history[0])

    if (!from || !ctrl.wrapper) return

    return ctrl.resolve(from)
  }

  const handleEntering = () => {
    const target = ctrl.items.get(history[1])

    if (!target || !ctrl.wrapper) return

    return ctrl.resolve(target)
  }

  const handleEntered = () => { setIsShowChar(true) }

  const returnEarly = useWatchValue(char, () => {
    setHistory([history[1], char], () => { setIsShowChar(false) })
  })

  return {
    omitted: props,
    ctrl,
    ns,
    cssNames: classNames,
    returnEmpty: returnEarly,
    isShowChar,
    handleEnter,
    handleEntering,
    handleEntered,
  }
}
