import type { VoidFn } from '@mink-ui/shared/interface'
import type { FormItemInputProps, OmittedFormItemInputProps, PickedFormItemInputProps } from '../form-item-input.props'
import type { FormItemLabelProps, OmittedFormItemLabelProps, PickedFormItemLabelProps } from '../form-item-label.props'
import type { FormItemProps, OmittedFormItemProps, PickedFormItemProps } from '../form-item.props'

import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import { pushItem } from '@mink-ui/shared/array/push-item'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isString } from '@mink-ui/shared/is/is-string'
import { pick } from '@mink-ui/shared/object/pick'

import { InternalFormListContext } from '../../../_shared/components/form/src'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { FormInstanceContext, FormPropsContext, PureItemContext } from '../_shared.context'
import { includedFormItemInputProps } from '../form-item-input.props'
import { includedFormItemLabelProps } from '../form-item-label.props'
import { prepareFormItemChildren } from '../utils/children'
import { flattenFormItemChildren } from '../utils/flatten'
import { formatFormItemId, normalizeValidateStatus } from '../utils/format'
import { useFormItemInputClassNames, useFormItemLabelClassNames, useImpureFormItemClassNames } from './use-class-names'
import { useFormInputOffset } from './use-form-input-offset'
import { useFormItemMetaInfo, useFormItemPureInfo } from './use-item-meta-info'

/**
 * @description pure 模式下的 Form.Item 组件 hook
 */
export function usePureFormItemProps(props: FormItemProps) {
  const propsContext = FormPropsContext.use()
  const listContext = InternalFormListContext.use()
  const formInstance = FormInstanceContext.use()
  const onPureChange = PureItemContext.use()

  const omitted = props as OmittedFormItemProps
  const picked: PickedFormItemProps = { children: flattenFormItemChildren(props) }

  const [metaInfo, onMetaChange] = useFormItemMetaInfo()

  const hasError = !!(metaInfo.warnings.length || metaInfo.errors.length)

  const result = prepareFormItemChildren(picked, omitted, formInstance)

  const itemId = result.valid
    ? formatFormItemId(omitted, propsContext, listContext)
    : undefined

  return {
    omitted,
    metaInfo,
    hasError,
    result,
    itemId,
    onMetaChange,
    onPureChange,
  }
}

/**
 * @description 普通模式下的 Form.Item 组件 hook
 */
export function useImpureFormItemProps(props: FormItemProps) {
  const propsContext = FormPropsContext.use()
  const listContext = InternalFormListContext.use()
  const formInstance = FormInstanceContext.use()

  const omitted = props as OmittedFormItemProps
  const picked: PickedFormItemProps = {
    children: flattenFormItemChildren(props),
  }

  const { help } = omitted

  const $item = useRef<HTMLDivElement>(null)
  const $input = useRef<VoidFn>(null)

  const [metaInfo, onMetaChange] = useFormItemMetaInfo()

  // 其下所有的pure字段错误信息在此收集
  const [pureInfo, onPureChange] = useFormItemPureInfo()

  // 合并后的错误信息
  const [warnings, errors] = useMemo(() => {
    return Object.values(pureInfo).reduce((acc, cur) => {
      if (!cur) return acc

      pushItem(acc[0], cur.warnings)
      pushItem(acc[1], cur.errors)

      return acc
    }, [[...metaInfo.warnings], [...metaInfo.errors]])
  }, [metaInfo.errors, metaInfo.warnings, pureInfo])

  const hasError = !isNullish(help) || !!(warnings.length || errors.length)

  const status = normalizeValidateStatus(metaInfo, omitted, '')

  const { ns, classNames } = useImpureFormItemClassNames(omitted, hasError, status)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      omitted.styles,
      { root: omitted.style },
    ],
  )

  const result = prepareFormItemChildren(picked, omitted, formInstance)

  const itemId = result.valid
    ? formatFormItemId(omitted, propsContext, listContext)
    : undefined

  const itemLabelInherited = pick(props, includedFormItemLabelProps)

  const itemInputInherited = pick(props, includedFormItemInputProps)

  const onGetFormItemElement = useCallback(() => $item.current, [])

  // 由子组件提升到父组件
  useLayoutEffect(() => { $input.current?.() }, [])

  return {
    picked,
    omitted,
    $item,
    $input,
    ns,
    cssNames,
    cssAttrs,
    hasError,
    warnings,
    errors,
    status,
    result,
    itemId,
    itemLabelInherited,
    itemInputInherited,
    onMetaChange,
    onPureChange,
    onGetFormItemElement,
  }
}

/**
 * @description FormItemLabel 组件 hook
 */
export function useFormItemLabelProps(props: FormItemLabelProps) {
  const propsContext = FormPropsContext.use()

  const {
    label,
    colon = propsContext.colon,
    labelAlign = propsContext.labelAlign,
    labelCol = propsContext.labelCol,
    labelWrap = propsContext.labelWrap,
    requiredMark = propsContext.requiredMark,
    htmlFor = props.itemId,
  } = props

  const omitted = props as OmittedFormItemLabelProps
  const picked: PickedFormItemLabelProps = {
    htmlFor,
    colon,
    labelAlign,
    labelCol,
    labelWrap,
    requiredMark,
  }

  const classNames = useFormItemLabelClassNames(picked, omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      { root: propsContext.classNames?.label },
      { root: labelCol?.className },
      classNames,
      { root: omitted.className },
    ],
    [
      { root: propsContext.styles?.label },
      { root: labelCol?.style },
      { root: omitted.style },
    ],
  )

  const htmlTitle = isString(label) ? label : undefined

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    htmlTitle,
  }
}

/**
 * @description FormItemInput 组件 hook
 */
export function useFormItemInputProps(props: FormItemInputProps) {
  const propsContext = FormPropsContext.use()

  const { status, rootNamespace, wrapperCol = propsContext.wrapperCol } = props

  const omitted = props as OmittedFormItemInputProps
  const picked: PickedFormItemInputProps = { wrapperCol }

  const { $extra, offset, hasError, returnEmpty, onCleanupOffset } = useFormInputOffset(omitted)

  const errorListContextValue = useMemo(() => ({ rootNamespace, status }), [rootNamespace, status])

  const classNames = useFormItemInputClassNames(omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      { root: propsContext.classNames?.input },
      { root: wrapperCol?.className },
      classNames,
      { root: omitted.className },
    ],
    [
      { root: propsContext.styles?.input },
      { root: wrapperCol?.style },
      { root: omitted.style },
    ],
  )

  return {
    picked,
    omitted,
    $extra,
    errorListContextValue,
    cssNames,
    cssAttrs,
    offset,
    hasError,
    returnEmpty,
    onCleanupOffset,
  }
}
