import type { OmittedFormItemProps, PickedFormItemProps } from '../form-item.props'

import { isValidElement } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'
import { isArray } from '@mink-ui/shared/is/is-array'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { logger } from '../../../_shared/utils/logger'

/**
 * @description 用法是否合法
 */
export function isValidUsage(
  picked: PickedFormItemProps,
  omitted: OmittedFormItemProps,
) {
  const { children } = picked
  const { name, shouldUpdate, dependencies } = omitted

  const hasName = toArray(name).length > 0

  const hasDependencies = toArray(dependencies).length > 0

  const functional = isFunction(children)

  // shouldUpdate 和 hasDependencies 不能同时使用 (仅提示)
  if (process.env.NODE_ENV !== 'production') {
    if (shouldUpdate && hasDependencies) {
      logger.warn(
        'Form.Item',
        '`shouldUpdate` and `dependencies` shouldn\'t be used together',
      )
    }

    // 设置了 defaultValue 属性
    if (isValidElement<{ defaultValue?: any }>(children)) {
      if (!isUndefined(children.props.defaultValue)) {
        logger.warn(
          'Form.Item',
          '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.',
        )
      }
    }

    // 多个元素 && name
    if (isArray(children) && hasName) {
      logger.warn(
        'Form.Item',
        'A `Form.Item` with a `name` prop must have a single child element.',
      )
    }
  }

  // render props 模式
  if (functional) {
    // render props 不能设置 name
    if (hasName) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn(
          'Form.Item',
          'A `Form.Item` with a render function cannot be a field, and thus cannot have a `name` prop.',
        )
      }

      return [false, children, functional] as const
    }

    // 必须设置 shouldUpdate 或 dependencies
    if (!(shouldUpdate || hasDependencies)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn(
          'Form.Item',
          'A `Form.Item` with a render function must have either `shouldUpdate` or `dependencies`.',
        )
      }

      return [false, children, functional] as const
    }

    return [true, children, functional] as const
  }

  // 没有最重要的 name 属性
  if (!hasName) {
    // dependencies 需要配合 name 使用
    if (hasDependencies) {
      if (process.env.NODE_ENV !== 'production') {
        logger.warn(
          'Form.Item',
          'Must set `name` when `dependencies` is set.',
        )
      }

      return [false, children, functional] as const
    }

    return [null, children, functional] as const
  }

  return [true, children, functional] as const
}
