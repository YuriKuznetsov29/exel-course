import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
        // this.row = null
        // this.col = null
        // this.startPoint = null
        // this.startSize = null
        // this.colNumber = null
    }

    toHTML() {
        return createTable(20)
    }

    // onClick(event) {
    //     console.log(event)
    //     console.log(event.target)
    //     console.log(event.currentTarget)
    // }

    onMousedown(event) { 
        // console.log(event.target.getAttribute('data-resize'))
        if (event.target.dataset.resize === 'col') {
            const $resizer = $(event.target) // получаем instance класса dom
            // const $parent = $resizer.parentNode // bad так как в таком случае мы зависим от верстки и в случае ее изменения придется менять логику
            // const $parent = $resizer.closest('.column') // better but bad
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            document.onmousemove = e => {
                const delta = e.pageX - coords.right
                const value = coords.width + delta
                $parent.$el.style.width = value + 'px'
            }
            document.onmouseup = () => {
                document.onmousemove = null
            }
        }

        // if (event.target.dataset.resize === 'col') {
        //     console.log('Start resizing')
        //     console.log(event.target.parentElement.clientWidth)
        //     this.startSize = event.target.parentElement.clientWidth
        //     this.startPoint = event.pageX
        //     this.col = event.target.parentElement
        // }
    }

    // onMousemove(event) {
    //     // console.log('mousemove')
    //     if (this.row) {
    //         // console.log(this.element)
    //         // console.log(((event.pageY - this.startPoint) > 0 ? (event.pageY - this.startPoint) : (this.startPoint - event.pageY)))
    //         this.row.style.height = this.startSize + (event.pageY - this.startPoint) + 'px'
    //     }
    //     if (this.col) {
    //         // console.log(this.element)
    //         // console.log(((event.pageY - this.startPoint) > 0 ? (event.pageY - this.startPoint) : (this.startPoint - event.pageY)))
    //         this.col.style.width = this.startSize + (event.pageX - this.startPoint) + 'px'
    //         document.querySelectorAll('[data-resize="0"]').forEach(el => {
    //             el.style.width = this.startSize + (event.pageX - this.startPoint) + 'px'
    //         })
    //     }
    // }

    // onMouseup() {
    //     this.row = null
    //     this.col = null
    // }
}