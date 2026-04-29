import type { ScrollNumberProps } from './scroll-number.props'

import { CssTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { mergeRefs } from '../../_shared/utils/refs'
import { naturals } from './_shared.constant'
import { useScrollNumberProps } from './hooks/use-scroll-number-props'

function ScrollNumber(props: ScrollNumberProps) {
  const {
    omitted,
    refs,
    ns,
    cssNames,
    returnEmpty,
    isShowChar,
    handleOnEnter,
    handleOnEntering,
    handleOnEntered,
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
      onEnter={handleOnEnter}
      onEntered={handleOnEntered}
      onEntering={handleOnEntering}
    >
      {($motion, getters) => (
        <span
          ref={mergeRefs($motion, refs.$wrapper)}
          className={cn(cssNames.root, getters.names())}
          style={getters.attrs()}
        >
          {naturals.map(natural => (
            <span
              key={natural}
              ref={(el) => {
                if (el) refs.$items.set(natural, el)
                else refs.$items.delete(natural)
              }}
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
