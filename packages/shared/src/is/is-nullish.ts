export function isNullish(obj: any): obj is null | undefined {
  return obj == null
}
