import type { SpaceProps } from './space.props'

import { isValidElement } from 'react'
import { Fragment } from 'react/jsx-runtime'

import { flattenChildren } from '../../_shared/utils/children'
import { defineName } from '../../_shared/utils/define-name'
import { isRenderable } from '../../_shared/utils/renderable'
import { useSpaceProps } from './hooks/user-space-props'

function Space(props: SpaceProps) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
  } = useSpaceProps(props)

  const { ref, children, separator } = omitted

  const renderSpaceChildren = () => {
    return flattenChildren(children, { keepNullish: true })
      .map((child, index, array) => {
        const isLast = index === array.length - 1
        const key = isValidElement(child) ? child.key : undefined

        return (
          <Fragment key={key ?? `${cssNames.item}--${index}`}>
            <div className={cssNames.item} style={cssAttrs.item}>
              {child}
            </div>

            {!isLast && isRenderable(separator) && (
              <span className={cssNames.separator} style={cssAttrs.separator}>
                {separator}
              </span>
            )}
          </Fragment>
        )
      })
  }

  return (
    <div
      {...restAttrs}
      ref={ref}
      className={cssNames.root}
      style={cssAttrs.root}
    >
      {renderSpaceChildren()}
    </div>
  )
}

defineName(Space)

export default Space
