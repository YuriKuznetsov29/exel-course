import { defaultName, defaultStyles } from "../constants"
import { storage } from "../core/utils"

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    tableName: defaultName
}

// function normalizeCurrentStyles(state) {
//     console.log('dsfsff', state)
//     return {
//         ...state,
//         currentStyles: defaultStyles
//     }
// }

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState