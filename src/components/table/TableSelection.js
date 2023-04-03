export class TableSelection {
    constructor() {
        this.group = []
        this.current = null
    }

    static className = 'selected'

    select($el) {
        this.clear()
        this.current = $el
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
    }

    selectGroup($group) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.className))
        this.group = []
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}