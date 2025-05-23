import type { MayBe } from '../interface'

export function ownerDocument(node?: MayBe<Node>) {
  return (node && node.ownerDocument) || globalThis.document
}

export function ownerWindow(node?: MayBe<Node>) {
  const root = ownerDocument(node)
  return root.defaultView || globalThis.window
}

export function getElementStyle(node: Element) {
  return ownerWindow(node).getComputedStyle(node, null)
}

export function ownerBody(node?: MayBe<Node>) {
  return ownerDocument(node).body
}
