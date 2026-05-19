import type { SegmentedProps } from './segmented.props'

import { CssTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { combineRefs } from '../../_shared/utils/refs'
import { useSegmentedProps } from './hooks/use-segmented-props'
import SegmentedItem from './segmented-item'

function Segmented(props: SegmentedProps) {
  const {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    options,
    value,
    isShowThumb,
    outerCssNames,
    outerCssAttrs,
    returnEmpty,
    handleChange,
    handleEnter,
    handleEntering,
    handleEntered,
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
        onEnter={handleEnter}
        onEntered={handleEntered}
        onEntering={handleEntering}
      >
        {($motion, getters) => (
          <div
            ref={combineRefs($motion, ctrl.$thumb)}
            className={cn(cssNames.thumb, getters.names())}
            style={{ ...cssAttrs.thumb, ...getters.attrs() }}
          />
        )}
      </CssTransition>
    )
  }

  const renderSegmentedOptions = () => {
    return options.map(item => (
      <SegmentedItem
        key={item.value}
        checked={value === item.value}
        config={item}
        disabled={disabled || item.disabled}
        isShowThumb={isShowThumb}
        outerCssAttrs={outerCssAttrs}
        outerCssNames={outerCssNames}
        outerNamespace={ns}
        onChange={handleChange}
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
