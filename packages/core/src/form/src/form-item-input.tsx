import type { FormItemInputProps } from './form-item-input.props'

import { isRenderable } from '../../_shared/utils/renderable'
import { Col } from '../../grid/src'
import { ErrorListContext } from './_shared.context'
import FormErrorList from './form-error-list'
import { useFormItemInputProps } from './hooks/use-form-item-props'

function FormItemInput(props: FormItemInputProps) {
  const {
    picked,
    omitted,
    $extra,
    ns,
    errorListContextValue,
    cssNames,
    cssAttrs,
    offset,
    hasError,
    returnEmpty,
    handleGroupExited,
  } = useFormItemInputProps(props)

  const { wrapperCol } = picked
  const { children, itemId, help, extra, status, warnings, errors } = omitted

  const showErrorElement = offset.margin > 0 || hasError

  const showExtraElement = isRenderable(extra)

  if (returnEmpty) return null

  return (
    <Col {...wrapperCol} className={cssNames.root} style={cssAttrs.root}>
      {/* <FormPropsContext value={propsContext}> */}
      <div className={`${ns}-content`}>
        {children}
      </div>

      {/* 为了保证视图的连贯，将 errorList 与 extra 渲染到一起 */}
      {(showErrorElement || showExtraElement) && (
        <div
          className={`${ns}-additional`}
          style={offset.margin ? { minHeight: offset.margin + offset.extra } : undefined}
        >
          {showErrorElement && (
            <ErrorListContext value={errorListContextValue}>
              <FormErrorList
                className={`${ns}-messages`}
                errors={errors}
                help={help}
                helpStatus={status}
                itemId={itemId}
                warnings={warnings}
                onGroupExited={handleGroupExited}
              />
            </ErrorListContext>
          )}
          {showExtraElement && <div ref={$extra} className={`${ns}-extra`}>{extra}</div>}
        </div>
      )}

      {offset.margin > 0 && <div className={`${ns}-offset`} style={{ marginBottom: -offset.margin }} />}
      {/* </FormPropsContext> */}
    </Col>
  )
}

export default FormItemInput
