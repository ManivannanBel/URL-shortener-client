import axios from 'axios';
import { GET_ERRORS, GET_URLS_LIST, GET_SHORT_URL, GET_MESSAGE } from "./types";

export const shortenUrl = (url, id) => async dispatch => {

    axios.post(`http://localhost:5000/url/${id}`, url)
        .then(res => {
            dispatch({
                type : GET_SHORT_URL,
                payload : res.data.url
            })
    //        console.log(res.data);
                dispatch({
                    type : GET_MESSAGE,
                    payload : { success : "Url shortened successfully"}
                })
                getUrlList(id);
        }).catch(err => {
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            })
        })

    /*try{
        const res = await axios.post(`http://localhost:5000/url/${id}`, url);
        dispatch({
            type : GET_SHORT_URL,
            payload : res.data.url
        })
//        console.log(res.data);
            dispatch({
                type : GET_MESSAGE,
                payload : { success : "Url shortened successfully"}
            })
           await getUrlList(id);
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }*/

}

export const getUrlList = (id) => async dispatch => {
    
    try{
        const res = await axios.post(`http://localhost:5000/url/urls/${id}`);
        dispatch({
            type : GET_URLS_LIST,
            payload : res.data
        })
        console.log(res.data)
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}