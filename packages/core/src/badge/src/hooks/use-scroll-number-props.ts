import type { ScrollNumberProps } from '../scroll-number.props'

import { getClientCoords } from '@mink-ui/shared/dom/rect'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useExactState } from '../../../_shared/hooks/use-exact-state'
import { useWatchValue } from '../../../_shared/hooks/use-watch-value'
import { ScrollNumberRefs } from '../utils/scroll-number-refs'
import { useScrollNumberClassNames } from './use-class-names'

export function useScrollNumberProps(props: ScrollNumberProps) {
  const { char } = props

  const refs = useConstant(() => new ScrollNumberRefs())

  const [history, setHistory] = useExactState([null, char])

  const [isShowChar, setIsShowChar] = useExactState(true)

  const { ns, classNames } = useScrollNumberClassNames(props)

  const returnEarly = useWatchValue(char, () => {
    setHistory([history[1], char])

    setIsShowChar(false)
  })

  const resolveTransform = (el: HTMLElement, item: HTMLElement) => {
    const wrapCoords = getClientCoords(refs.wrapper!)
    const itemCoords = getClientCoords(item)

    const delta = wrapCoords.top - itemCoords.top

    const value = `translate3d(0, ${delta}px, 0)`

    return { transform: value }
  }

  const handleOnEnter = (el: HTMLElement) => {
    const from = refs.items.get(history[0])

    if (!from || !refs.wrapper) return

    return resolveTransform(el, from)
  }

  const handleOnEntering = (el: HTMLElement) => {
    const target = refs.items.get(history[1])

    if (!target || !refs.wrapper) return

    return resolveTransform(el, target)
  }

  const handleOnEntered = () => { setIsShowChar(true) }

  return {
    omitted: props,
    refs,
    ns,
    cssNames: classNames,
    returnEmpty: returnEarly,
    isShowChar,
    handleOnEnter,
    handleOnEntering,
    handleOnEntered,
  }
}
