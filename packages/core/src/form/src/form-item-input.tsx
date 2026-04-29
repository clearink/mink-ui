import type { FormItemInputProps } from './form-item-input.props'

import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { Col } from '../../grid/src'
import { ErrorListContext } from './_shared.context'
import FormErrorList from './form-error-list'
import { useFormItemInputProps } from './hooks/use-form-item-props'

function FormItemInput(props: FormItemInputProps) {
  const {
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
  } = useFormItemInputProps(props)

  const { wrapperCol } = picked
  const { children, itemId, help, extra, status, warnings, errors } = omitted

  const showErrorElement = offset.margin > 0 || hasError

  const showExtraElement = !isNullish(extra)

  if (returnEmpty) return null

  return (
    <Col {...wrapperCol} className={cssNames.root} style={cssAttrs.root}>
      {/* <FormPropsContext value={propsContext}> */}
      <div className={cssNames.content}>
        {children}
      </div>

      {/* 为了保证视图的连贯，将 errorList 与 extra 渲染到一起 */}
      {(showErrorElement || showExtraElement) && (
        <div
          className={cssNames.additional}
          style={offset.margin ? { minHeight: offset.margin + offset.extra } : undefined}
        >
          {showErrorElement && (
            <ErrorListContext value={errorListContextValue}>
              <FormErrorList
                className={cssNames.messages}
                errors={errors}
                help={help}
                helpStatus={status}
                itemId={itemId}
                warnings={warnings}
                onFinished={onCleanupOffset}
              />
            </ErrorListContext>
          )}
          {showExtraElement && <div ref={$extra} className={cssNames.extra}>{extra}</div>}
        </div>
      )}

      {offset.margin > 0 && <div className={cssNames.offset} style={{ marginBottom: -offset.margin }} />}
      {/* </FormPropsContext> */}
    </Col>
  )
}

export default FormItemInput
