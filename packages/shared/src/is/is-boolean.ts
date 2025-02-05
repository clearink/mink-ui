import { rawType } from '../object/raw-type'

export function isBoolean(obj: any): obj is boolean {
  return rawType(obj) === 'Boolean'
}
