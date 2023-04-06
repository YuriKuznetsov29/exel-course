import { defaultName, defaultStyles } from "../constants"
// import { storage } from "../core/utils"

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    tableName: defaultName,
    openDate: new Date()
}

function normalize(state) {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: ''
    }
}

// export const initialState = storage('excel-state') ? storage('excel-state') : defaultState

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState
}