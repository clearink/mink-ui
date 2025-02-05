// 校验失败声明
export const base = {
  invalid: '{#path} is invalid',
  required: '{#path} is a required field',
}

export const string = {
  email: '{#path} must be a valid email',
  invalid: '{#path} must be a string',
  length: '{#path} must be exactly {#length} characters',
  lowercase: '{#path} must be a lowercase string',
  max: '{#path} must be at most {#max} characters',
  min: '{#path} must be at least {#min} characters',
  range: '{#path} length be between {#min} and {#max}',
  regex: '{#path} must match the following: "{#regex}"',
  uppercase: '{#path} must be a upper case string',
  url: '{#path} must be a valid URL',
  uuid: '{#path} must be a valid UUID',
}

export const number = {
  equal: '{#path} must be equal to {#equal}',
  integer: '{#path} must be an integer',
  invalid: '{#path} must be a number',
  max: '{#path} must be less than {#max}',
  min: '{#path} must be greater than {#min}',
  negative: '{#path} must be a negative number',
  positive: '{#path} must be a positive number',
  range: '{#path} be between {#min} and {#max}',
}

export const boolean = {
  false: '{#path} field must be false',
  invalid: '{#path} must be a boolean',
  true: '{#path} field must be true',
}

export const date = {
  invalid: '{#path} must be a date',
  max: '{#path} field must be at earlier than {#max}',
  min: '{#path} field must be later than {#min}',
}

export const object = {
  invalid: '{#path} must be a object',
  unknown: '{#path} field has unspecified keys: {#unknown}',
}

export const array = {
  invalid: '{#path} must be a array',
  length: '{#path} must have {#length} items',
  max: '{#path} field must have less than or equal to {#max} items',
  min: '{#path} field must have at least {#min} items',
  nonempty: '{#path} must have at least one items',
}

export const enums = {
  invalid: '{#path} must be include {#enums}',
}

export const union = {
  invalid: '{#path} is invalid union type',
}
