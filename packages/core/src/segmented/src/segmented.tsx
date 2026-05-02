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
    ctrl,
    ns,
    cssNames,
    cssAttrs,
    outerCssNames,
    outerCssAttrs,
    normalizedOptions,
    currentValue,
    isShowThumb,
    returnEmpty,
    handleOnChange,
    handleOnEnter,
    handleOnEntering,
    handleOnEntered,
  } = useSegmentedProps(props)

  const { disabled } = omitted

  if (returnEmpty) return null

  const renderSegmentedThumb = () => {
    if (!isShowThumb) return null

    return (
      <CssTransition
        ref={ctrl.$instance}
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
            ref={mergeRefs($motion, ctrl.$thumb)}
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
        key={item.value}
        checked={currentValue === item.value}
        config={item}
        disabled={disabled || item.disabled}
        isShowThumb={isShowThumb}
        outerCssAttrs={outerCssAttrs}
        outerCssNames={outerCssNames}
        outerNamespace={ns}
        onChange={handleOnChange}
        onCollect={ctrl.collect}
      />
    ))
  }

  return (
    <div
      className={cssNames.root}
      style={cssAttrs.root}
    >
      <div ref={ctrl.$inner} className={cssNames.inner} style={cssAttrs.inner}>
        {renderSegmentedThumb()}
        {renderSegmentedOptions()}
      </div>
    </div>
  )
}

defineName(Segmented)

export default Segmented
