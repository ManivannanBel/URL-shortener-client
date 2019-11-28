import axios from "axios";
import { GET_ERRORS, GET_URLS_LIST, GET_SHORT_URL, GET_MESSAGE, ADD_TO_URL_LIST, DELETE_SHORT_URL } from "./types";

export const shortenUrl = (url, id) => dispatch => {
  axios
    .post(`http://localhost:5000/url/${id}`, url)
    .then(res => {
      dispatch({
        type: GET_SHORT_URL,
        payload: res.data
      });
      console.log(res.data)
    if(res.data.updateList){
        dispatch({
            type: ADD_TO_URL_LIST,
            payload: res.data.url
        })  
    }  
    dispatch({
        type: GET_MESSAGE,
        payload: { success: res.data.success }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

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
};

export const getUrlList = id => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:5000/url/urls/${id}`);
    dispatch({
      type: GET_URLS_LIST,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};


export const deleteUrl = (url, id) => async dispatch => {

    if(window.confirm(`Do you want to delete this url (${url.url})?`)){
    try{
        console.log(url)
        //const res = await axios.delete(`http://localhost:5000/url/${id}`, url);
        const res = await axios({
            method : "DELETE",
            url : `http://localhost:5000/url/${id}`,
            data : {
                url : url.url
            }
        })
        dispatch({
            type: DELETE_SHORT_URL,
            payload: res.data.url
        })
        dispatch({
            type: GET_MESSAGE,
            payload: { success : res.data.success}
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }
    }
}