import axios from 'axios';
import { GET_ERRORS, GET_URLS_LIST, GET_SHORT_URL } from "./types";

export const shortenUrl = (url, id) => async dispatch => {

    try{
        const res = await axios.post(`http://localhost:5000/url/${id}`, url);
        dispatch({
            type : GET_SHORT_URL,
            payload : res.data
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}