import type { ScrollNumberProps } from '../scroll-number.props'

import { useState } from 'react'

import { useCommitState } from '../../../_shared/hooks/use-commit-state'
import { useConstant } from '../../../_shared/hooks/use-constant'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { ScrollNumberControl } from '../utils/scroll-number-control'
import { useScrollNumberClassNames } from './use-class-names'

export function useScrollNumberProps(props: ScrollNumberProps) {
  const { char } = props

  const ctrl = useConstant(() => new ScrollNumberControl())

  const [history, setHistory] = useCommitState (() => [null, char])

  const [isShowChar, setIsShowChar] = useState(true)

  const { ns, classNames } = useScrollNumberClassNames(props)

  const handleEnter = () => ctrl.resolve(history[0])

  const handleEntering = () => ctrl.resolve(history[1])

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
