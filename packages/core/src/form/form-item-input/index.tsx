import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { withDefaults } from '@mink-ui/core/_shared/utils'
import Col from '@mink-ui/core/col'
import { isNullish } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { FormItemInputProps } from './props'

import { FormContext, FormItemContext } from '../_shared.context'
import FormErrorList from '../form-error-list'
import useFormatClassNames from './hooks/use-format-class-names'
import useItemInputOffset from './hooks/use-item-offset'
import useMetaState from './hooks/use-meta-state'
import normalizeValidateStatus from './utils/normalize-validate-status'

function FormItemInput(_props: FormItemInputProps) {
  const ctx = FormContext.useState()

  const props = withDefaults(_props, {
    wrapperCol: ctx.wrapperCol,
  })

  const { children, extra, help, validateStatus: _status, wrapperCol } = props

  const prefixCls = usePrefixCls('form-item__control')

  const [meta, onMetaChange] = useMetaState()

  const [subMeta, onSubMetaChange] = useMetaState()

  const validateStatus = useMemo(() => normalizeValidateStatus(meta, _status), [meta, _status])

  const classNames = useFormatClassNames(prefixCls, validateStatus, wrapperCol)

  const formItemContext = useMemo(() => ({ validateStatus }), [validateStatus])

  const errors = useMemo(() => meta.errors.concat(subMeta.errors), [meta.errors, subMeta.errors])

  const warnings = useMemo(() => meta.warnings.concat(subMeta.warnings), [meta.warnings, subMeta.warnings])

  const hasError = !isNullish(help) || !!(errors.length || warnings.length)

  const { returnEarly, offset, cleanOffset } = useItemInputOffset(props, hasError)

  if (returnEarly) return null

  return (
    <Col {...wrapperCol} className={classNames.root}>
      <FormItemContext.Provider value={formItemContext}>
        <div className={`${prefixCls}-input`}>{children(onMetaChange, onSubMetaChange)}</div>

        {!!(hasError || offset) && (
          <div className={`${prefixCls}-status`} style={{ minHeight: offset }}>
            <FormErrorList
              errors={errors}
              help={help}
              helpStatus={validateStatus}
              warnings={warnings}
              onFinished={cleanOffset}
            />
          </div>
        )}

        {!isNullish(extra) && <div className={`${prefixCls}-extra`}>{extra}</div>}

        {!!offset && <div className={`${prefixCls}-offset`} style={{ marginBottom: -offset }} />}
      </FormItemContext.Provider>
    </Col>
  )
}

export default FormItemInput
