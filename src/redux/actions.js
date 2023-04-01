import { TABLE_RESIZE } from "./types";
import { CHANGE_TEXT } from "./types";


export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(text) {
    return {
        type: CHANGE_TEXT,
        data: text
    }
}