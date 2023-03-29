import { ExcelComponent } from "../../core/ExcelComponent";
import { isCell, shouldResize, nextSelector } from "./table.function";
import { resizeHandler } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom"
import { matrix } from "./table.function";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    static rowsQty = 20

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'keydown']
        })
    }

    toHTML() {
        return createTable(Table.rowsQty)
    }

    init() {
        super.init()
        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)    
    }

    onMousedown(event) { 
        if (shouldResize(event)) {
            resizeHandler(event, this.$root)
        }

        if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ["Tab", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Enter"] 

        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
             event.preventDefault();
            const id = this.selection.current.id(true)
            const $cell = this.$root.find(nextSelector(key, id))
            this.selection.select($cell)
        }
    }
}