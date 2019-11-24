import axios from 'axios';
import { GET_ERRORS, GET_URLS_LIST } from "./types";

export const shortenUrl = (url, id) => async dispatch => {

    try{
        const res = await axios.post(`/url/${id}`, url);
        dispatch({
            type : GET_URLS_LIST,
            payload : res.data
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}