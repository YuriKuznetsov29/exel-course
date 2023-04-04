export function parse(value) {
    if (value[0] === '=') {
        try {
        return eval(value.slice(1))
        } catch (e) {
            return value
        }
    }
    return value
}