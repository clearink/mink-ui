import { Form as InternalForm } from '@mink-ui/core/_shared/components'
import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import Row from '@mink-ui/core/row'
import { isNullish, pick } from '@mink-ui/shared'
import { createElement, useCallback, useRef } from 'react'

import type { FormItemProps } from './props'

import { FormContext, NoStyleContext } from '../_shared.context'
import FormItemInput from '../form-item-input'
import FormItemLabel from '../form-item-label'
import useFormItemId from './hooks/use-form-item-id'
import useFormatClassNames from './hooks/use-format-class-names'
import normalizeItemChildren from './utils/normalize-item-children'

const labelIncluded = [
  'colon',
  'htmlFor',
  'label',
  'labelAlign',
  'labelCol',
  'labelWrap',
  'requiredMark',
  'tooltip',
] as const
const inputIncluded = ['wrapperCol', 'extra', 'help', 'validateStatus'] as const

// 仅用于 noStyle 模式
function NoStyleFormItem(props: FormItemProps) {
  const { form: formInstance, formName } = FormContext.useState()

  const handleMetaChange = NoStyleContext.useState()

  const itemId = useFormItemId(props.name, formName)

  return (
    <InternalForm.Field {...props} onMetaChange={handleMetaChange}>
      {normalizeItemChildren(props, formInstance, itemId)}
    </InternalForm.Field>
  )
}

function CommonFormItem(props: FormItemProps) {
  const { label, name, required, style } = props

  const { form: formInstance, formName } = FormContext.useState()

  const prefixCls = usePrefixCls('form-item')

  const itemId = useFormItemId(name, formName)

  const classNames = useFormatClassNames(prefixCls, props)

  const $outer = useRef<HTMLDivElement>(null)

  const getOuter = useCallback(() => $outer.current, [])

  const labelProps = pick(props, labelIncluded)

  const inputProps = pick(props, inputIncluded)

  // if (isValidElement(children)) {
  //   // TODO: 检测是否支持 ref 获取 dom 用于实现 scrollToField
  // }

  return (
    <Row ref={$outer} className={classNames.root} style={style}>
      {!isNullish(label) && <FormItemLabel {...labelProps} htmlFor={itemId} required={required} />}
      <FormItemInput {...inputProps} getOuter={getOuter}>
        {(onMetaChange, onSubMetaChange) => (
          <NoStyleContext.Provider value={onSubMetaChange}>
            <InternalForm.Field {...props} onMetaChange={onMetaChange}>
              {normalizeItemChildren(props, formInstance, itemId)}
            </InternalForm.Field>
          </NoStyleContext.Provider>
        )}
      </FormItemInput>
    </Row>
  )
}

function FormItem<State = any>(props: FormItemProps<State>) {
  return createElement(props.noStyle ? NoStyleFormItem : CommonFormItem, props)
}

betterDisplayName(FormItem, 'Form.Item')

export default FormItem
