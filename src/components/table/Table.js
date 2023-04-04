import { ExcelComponent } from "../../core/ExcelComponent";
import { isCell, shouldResize } from "./table.function";
import { resizeHandler } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom"
import { matrix } from "./table.function";
import { nextSelector } from "../../core/utils";
import * as actions from '@/redux/actions'
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    static rowsQty = 20

    constructor($root, options) {
        super($root, {
            listeners: ['mousedown', 'keydown', 'input'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return createTable(Table.rowsQty, this.store.getState())
    }

    init() {
        super.init()

        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        // this.$on('formula:input', (value) => {
        //     this.selection.current
        //     .attr('data-value', value)
        //     .text(value)
        //     this.updateTextInStore(value)
        // })

        this.$on('formula:input', value => {
            this.selection.current.attr('data-value', value)
            this.selection.current.text(parse(value))
            this.updateTextInStore(value)
          })

        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds

            }))
        })

        // this.$subscribe(state => {
        //     console.log('TableState', state)
        // })
    }

    storeChanged({currentText}) {
        this.selection.current.text(parse(currentText))
      }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        console.log(styles)
        this.$dispatch(actions.changeStyles(styles))
        // console.log('styles to dispatch', styles)
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event, this.$root)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) { 
        if (shouldResize(event)) {
            this.resizeTable(event)
        }

        if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selectCell($cell)
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target).text())
        this.updateTextInStore($(event.target).text())
    }
}