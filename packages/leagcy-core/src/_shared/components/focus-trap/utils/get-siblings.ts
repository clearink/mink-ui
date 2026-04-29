export default function getSiblings(first: Element, end: Element) {
  let next: Element | null = first.nextElementSibling

  const result: Element[] = []

  while (next && next !== end) {
    if (next) result.push(next)

    next = next?.nextElementSibling || null
  }

  return result
}
