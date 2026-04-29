import type { SegmentedProps } from './segmented.props'

import { CssTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { mergeRefs } from '../../_shared/utils/refs'
import { useSegmentedProps } from './hooks/use-segmented-props'
import SegmentedItem from './segmented-item'

function Segmented(props: SegmentedProps) {
  const {
    omitted,
    refs,
    ns,
    cssNames,
    cssAttrs,
    restAttrs,
    rootCssNames,
    rootCssAttrs,
    normalizedOptions,
    currentValue,
    isShowThumb,
    returnEmpty,
    handleOnEnter,
    handleOnEntering,
    handleOnEntered,
    handleOnChange,
  } = useSegmentedProps(props)

  const { disabled } = omitted

  if (returnEmpty) return null

  const renderSegmentedThumb = () => {
    if (!isShowThumb) return null

    return (
      <CssTransition
        ref={refs.$instance}
        classNames={`${ns}-motion`}
        appear
        when
        timeouts={3000}
        onEnter={handleOnEnter}
        onEntered={handleOnEntered}
        onEntering={handleOnEntering}
      >
        {($motion, getters) => (
          <div
            ref={mergeRefs($motion, refs.$thumb)}
            className={cn(cssNames.thumb, getters.names())}
            style={{ ...cssAttrs.thumb, ...getters.attrs() }}
          />
        )}
      </CssTransition>
    )
  }

  const renderSegmentedOptions = () => {
    return normalizedOptions.map(item => (
      <SegmentedItem
        {...item}
        key={item.value}
        ref={(el) => {
          if (el) refs.$items.set(item.value, el)
          else refs.$items.delete(item.value)
        }}
        checked={currentValue === item.value}
        disabled={disabled || item.disabled}
        isShowThumb={isShowThumb}
        rootCssAttrs={rootCssAttrs}
        rootCssNames={rootCssNames}
        rootNamespace={ns}
        onChange={handleOnChange}
      />
    ))
  }

  return (
    <div
      {...restAttrs}
      className={cssNames.root}
      style={cssAttrs.root}
    >
      <div ref={refs.$inner} className={cssNames.inner} style={cssAttrs.inner}>
        {renderSegmentedThumb()}
        {renderSegmentedOptions()}
      </div>
    </div>
  )
}

defineName(Segmented)

export default Segmented
