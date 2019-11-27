import { CLEAR_ERRORS, CLEAR_MESSAGE, CLEAR_SHORT_URL } from "./types"

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

export const clearShortUrl = () => dispatch => {
    dispatch({
        type : CLEAR_SHORT_URL,
        payload : ""
    })
}