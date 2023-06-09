class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' 
        ? document.querySelector(selector)
        : selector
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }


    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    // get text() {
    //     return this.$el.textContent
    // }

    // set text(text) {
    //     this.$el.textContent = text
    // }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.html('')
        return this
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

    get data() {
        return this.$el.dataset
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(style = {}) {
        // for (const key in stylle) {
        //    this.$el.style[key] = style[key]
        // }
        Object.keys(style).forEach(el => this.$el.style[el] = style[el])
    }

    getStyles(styles = []) {
        const baseStyle = (key) => {
            switch (key) {
                case 'textAlign':
                    return 'left'
                case 'textDecoration':
                    return 'none'
                case 'fontWeight':
                case 'fontStyle':
                    return 'normal'
                default:
                    break;
            }
        }
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s] // === '' ? baseStyle(s) : this.$el.style[s]
            return res
        }, {})
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id // data - дата атрибут
    }

    focus() {
        this.$el.focus()
        return this
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}