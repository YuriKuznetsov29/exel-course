const CODES = {
    A: 65,
    Z: 90
}

function createCell(content) {
    return `<div class="cell">${content}</div>`
}

function createCol(content) {
    return `<div class="column">${content}</div>`
}

function createRow(content) {
    return `
    <div class="row">
        <div class="row-info"></div>
        <div class="row-data">${content}</div>
    </div>`
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A
    const rows = []
    const cols = []
    const cell = []

    for (let i = 0; i < colsCount; i++) {
        cell.push(createCol(String.fromCharCode(CODES.A++)))
    }

    for (let i = 0; i < colsCount; i++) {
        cols.push(createCol(String.fromCharCode(CODES.A++)))
    }

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow())
    }

    return rows.join('')
}