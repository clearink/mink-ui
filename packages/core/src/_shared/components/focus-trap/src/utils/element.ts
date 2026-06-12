export function getSiblingElements(start: Element, end: Element) {
  let next = start.nextElementSibling

  const result: Element[] = []

  while (next && next !== end) {
    result.push(next)

    next = next.nextElementSibling
  }

  return result
}
