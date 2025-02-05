import type { MayBe } from '../interface'

export function addClassNames(el: Element, ...classes: MayBe<string>[]) {
  classes.forEach((cls) => {
    cls && cls.split(/\s+/).forEach(c => c && el.classList.add(c))
  })
}

export function delClassNames(el: Element, ...classes: MayBe<string>[]) {
  classes.forEach((cls) => {
    cls && cls.split(/\s+/).forEach(c => c && el.classList.remove(c))
  })
}
