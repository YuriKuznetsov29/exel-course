// Pure functions
export function capitalaze(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string[0].toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
       [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export function nextSelector(key, {row, col}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
    }

    return `[data-id="${row}:${col}"]`
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function styleTransform(styles) {
    return styles.replace(/[A-Z]{1}/g, match => '-' + match.toLowerCase())
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
            .map(key => `${styleTransform(key)}: ${styles[key]}`)
            .join(';')
}

export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            fn(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}