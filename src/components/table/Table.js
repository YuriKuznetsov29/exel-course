import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize } from "./table.function";
import { resizeHandler } from "./table.resize";
import { createTable } from "./table.template";
import { selection, TableSelection } from "./TableSelection";

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
        if (shouldResize(event)) {
            resizeHandler(event, this.$root)
        }
    }

    init() {
        super.init()
        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
    }

    // onClick(event) {
    //     if (event.target.dataset.select) {
    //         const cell = selection(event.target)
    //         console.log(cell.$el.textContent)
    //     }
    // }
}