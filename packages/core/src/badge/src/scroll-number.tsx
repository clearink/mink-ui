import type { ScrollNumberProps } from './scroll-number.props'

import { CssTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { naturals } from './_shared.constant'
import { useScrollNumberProps } from './hooks/use-scroll-number-props'

function ScrollNumber(props: ScrollNumberProps) {
  const {
    omitted,
    ctrl,
    ns,
    cssNames,
    returnEmpty,
    isShowChar,
    handleEnter,
    handleEntering,
    handleEntered,
  } = useScrollNumberProps(props)

  const { char } = omitted

  if (returnEmpty) return null

  if (isShowChar) return char

  return (
    <CssTransition
      classNames={`${ns}-motion`}
      appear
      when
      timeouts={500}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
    >
      {($motion, getters) => (
        <span
          ref={$motion}
          className={cn(cssNames.root, getters.names())}
          style={getters.attrs()}
        >
          {naturals.map(natural => (
            <span
              key={natural}
              ref={el => ctrl.collect(el, natural)}
            >
              {natural}
            </span>
          ))}

        </span>
      )}
    </CssTransition>
  )
}

defineName(ScrollNumber)

export default ScrollNumber
