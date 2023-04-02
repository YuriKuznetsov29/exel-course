const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
const CODES = {
    A: 65,
    Z: 90
}
// function toCell(_, index) {
//     return `<div class="cell" contenteditable="" data-col="${index}" data-select="${index}"></div>`
// }


function getWidth(state, index) {
    // console.log('width: ' + (state[index] || DEFAULT_WIDTH) + 'px')
    return 'width: ' + (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    // console.log('width: ' + (state[index] || DEFAULT_WIDTH) + 'px')
    return 'height: ' + (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
    return (_, col) => {
        const id = `${row}:${col}`
        const data = state.dataState[`${row}:${col}`] || ''
        return `
        <div class="cell" 
        style="${getWidth(state.colState, col)}"
        contenteditable=""
        tabindex="1"
        data-col="${col}" 
        data-type="cell" 
        data-id=${id}
        >${data}</div>`
    }
}

function toColumn({col, index, width}) {
    return `
    <div class="column" data-type="resizable" data-col="${index}" style="${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(content, index = '', height) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
    <div class="row" data-type="resizable" data-row="${index}" style="${height}">
        <div class="row-info">
            ${index}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>`
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function widthWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(widthWidthFrom(state))
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((el, index) => { 
            //     return String.fromCharCode(CODES.A + index) + (i + 1)
            // })
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(cells, row + 1, getHeight(state.rowState, row + 1)))
    }

    return rows.join('')
}