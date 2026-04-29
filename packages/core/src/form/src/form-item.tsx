import type { MetaChangeEvent } from '../../_shared/components/form/src'
import type { FormItemProps } from './form-item.props'
import type { NormalizeFormItemChildrenOptions } from './utils/children'

import { isNullish } from '@mink-ui/shared/is/is-nullish'

import InternalForm from '../../_shared/components/form/src'
import ShouldUpdate from '../../_shared/components/should-update/src'
import { defineName } from '../../_shared/utils/define-name'
import { Row } from '../../grid/src'
import { PureItemContext } from './_shared.context'
import FormItemInput from './form-item-input'
import FormItemLabel from './form-item-label'
import { FormStatusProvider } from './form-status-provider'
import { useImpureFormItemProps, usePureFormItemProps } from './hooks/use-form-item-props'
import { normalizeFormItemChildren } from './utils/children'
import { shouldFormItemChildrenUpdate } from './utils/helpers'

/**
 * @description 渲染函数
 */
function renderFormItemChildren(
  options: NormalizeFormItemChildrenOptions,
  onMetaChange: (event: MetaChangeEvent) => void,
) {
  const [inject, element, valid] = normalizeFormItemChildren(options)

  if (!inject) return element

  const renderElement = () => {
    if (!valid) return element

    return (
      <ShouldUpdate {...element.props} when={shouldFormItemChildrenUpdate}>
        {element}
      </ShouldUpdate>
    )
  }

  return (
    <InternalForm.Field {...options.omitted} onMetaChange={onMetaChange}>
      {renderElement()}
    </InternalForm.Field>
  )
}

/**
 * @description 纯净模式 (无任何样式)
 */
function PureFormItem(props: FormItemProps) {
  const {
    omitted,
    hasError,
    result,
    itemId,
    onMetaChange,
    onPureChange,
  } = usePureFormItemProps(props)

  const { required } = omitted

  const options = { itemId, required, result, hasError, errors: [], omitted }

  return (
    <FormStatusProvider pure>
      {renderFormItemChildren(options, (event) => {
        onMetaChange(event)
        onPureChange(event)
      })}
    </FormStatusProvider>
  )
}

/**
 * @description 普通模式
 */
function ImpureFormItem(props: FormItemProps) {
  const {
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
  } = useImpureFormItemProps(props)

  const { label, required } = omitted

  // TODO: required 需要进行计算才行
  const options = { itemId, required, result, hasError, errors, omitted }

  return (
    <Row ref={$item} className={cssNames.root} style={cssAttrs.root}>
      {!isNullish(label) && (
        <FormItemLabel
          {...itemLabelInherited}
          className={cssNames.label}
          style={cssAttrs.label}
          itemId={itemId}
          required={!!required}
          rootNamespace={ns}
        />
      )}

      <FormItemInput
        {...itemInputInherited}
        ref={$input}
        className={cssNames.input}
        style={cssAttrs.input}
        errors={errors}
        itemId={itemId}
        rootNamespace={ns}
        status={status}
        warnings={warnings}
        onGetFormItemElement={onGetFormItemElement}
      >
        <PureItemContext value={onPureChange}>
          <FormStatusProvider>
            {renderFormItemChildren(options, onMetaChange)}
          </FormStatusProvider>
        </PureItemContext>
      </FormItemInput>
    </Row>
  )
}

function FormItem<V = any>(props: FormItemProps<V>) {
  const { pure, hidden } = props

  const JsxTag = pure && !hidden ? PureFormItem : ImpureFormItem

  return <JsxTag {...props} />
}

defineName(FormItem, 'Form.Item')

export default FormItem
