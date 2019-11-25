import { CLEAR_ERRORS, CLEAR_MESSAGE } from "./types"

export const clearErrors = () => dispatch => {
    dispatch({
        type : CLEAR_ERRORS,
        payload : {}
    })
}

export const clearMessages = () => dispatch => {
    dispatch({
        type : CLEAR_MESSAGE,
        payload : {}
    })
}