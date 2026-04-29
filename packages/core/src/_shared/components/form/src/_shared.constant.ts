/**
 * @description 唯一标识，用来获取 internalHooks
 */
export const HOOKS_SECRET = Symbol.for('_$mink-form-internal-hooks$_')

/**
 * @description 唯一标识，获取 fieldsInfo 时使用
 */
export const FIELD_MARK = Symbol.for('_$mink-form-field$_')

/**
 * @description 唯一标识，表示字段校验结束
 */
export const VALIDATE_FINISH = Symbol.for('_$mink-form-field-validate-finish$_')

/**
 * @description 唯一标识，表示字段未进行校验
 */
export const VALIDATE_INITIAL = Symbol.for('_$mink-form-field-validate-initial$_')

/**
 * @description 唯一标识，表示字段是否被拷贝过
 */
export const COPIED = Symbol.for('_$copied$_')

/**
 * @description 唯一标识，表示字段是否要被删除
 */
export const DELETE = Symbol.for('_$delete$_')
