import type { FormItemLabelProps } from './form-item-label.props'

import { Col } from '../../grid/src'
import { useFormItemLabelProps } from './hooks/use-form-item-props'
import { normalizeFormItemLabelChildren } from './utils/children'

function FormItemLabel(props: FormItemLabelProps) {
  const {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    htmlTitle,
  } = useFormItemLabelProps(props)

  const { htmlFor, labelCol } = picked

  return (
    <Col {...labelCol} className={cssNames.root} style={cssAttrs.root}>
      <label
        className={cssNames.content}
        style={cssAttrs.content}
        htmlFor={htmlFor}
        title={htmlTitle}
      >
        {normalizeFormItemLabelChildren(picked, omitted)}
      </label>
    </Col>
  )
}

export default FormItemLabel
