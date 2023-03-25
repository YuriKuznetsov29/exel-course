import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(event) { 
        if (event.target.dataset.resize) {
            const $resizer = $(event.target) // получаем instance класса dom
            // const $parent = $resizer.parentNode // bad так как в таком случае мы зависим от верстки и в случае ее изменения придется менять логику
            // const $parent = $resizer.closest('.column') // better but bad
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
            const type = $resizer.data.resize
            if (type === 'col') {
                document.onmousemove = e => {
                    const delta = e.pageX - coords.right
                    const value = coords.width + delta
                    // $parent.$el.style.width = value + 'px'
                    $parent.css({ width: value + 'px'})
                    // console.dir($parent.$el)
                    cells.forEach(el => el.style.width = value + 'px')
                }
            } else {
                document.onmousemove = e => {
                    const delta = e.pageY - coords.bottom
                    const value = coords.height + delta
                    // $parent.$el.style.height = value + 'px'
                    $parent.css({height: value + 'px'})
                }
            }
            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}