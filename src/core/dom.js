class Dom {
  constructor(selector) {
    /** @type {HTMLElement} **/
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  get data() {
    return this.$el.dataset
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  clear() {
    this.html('')
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  css(style = {}) {
    Object.keys(style).forEach((key) => {
      this.$el.style[key] = style[key]
    })
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, clasess = '') => {
  /** @type {HTMLElement} **/
  const el = document.createElement(tagName)
  if (clasess) {
    el.classList.add(clasess)
  }
  return $(el)
}
