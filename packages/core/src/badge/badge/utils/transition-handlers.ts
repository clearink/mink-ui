type E = HTMLDivElement

const handlers = {
  onEnter: (el: E) => {
    el.style.setProperty('width', '0px')
  },
  onEntering: (el: E) => {
    el.style.setProperty('width', `${el.scrollWidth}px`)
  },
  onEntered: (el: E) => {
    el.style.removeProperty('width')
  },
  onEnterCancel: (el: E) => {
    el.style.setProperty('width', `${el.offsetWidth}px`)
  },
  onExit: (el: E) => {
    el.style.setProperty('width', `${el.offsetWidth}px`)
  },
  onExiting: (el: E) => {
    el.style.setProperty('width', '0px')
  },
  onExited: (el: E) => {
    el.style.removeProperty('width')
  },
  onExitCancel: (el: E) => {
    el.style.setProperty('width', `${el.offsetWidth}px`)
  },
}

export default handlers
