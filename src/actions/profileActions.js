import axios from "axios";
import { GET_USER_DETAILS, GET_ERRORS, GET_USERNAME, GET_EMAIL, GET_MESSAGE, GET_API_STATUS } from "./types";

export const getUserProfileDetails = (id) => async dispatch => {
    
    try{
        const res = await axios.get(`http://localhost:5000/user/${id}`);
        dispatch({
            type : GET_USER_DETAILS,
            payload : res.data
        })
    }catch(err){
        //console.log(err)
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const updateUsername = (newUsername, id) => async dispatch => {

    try{
        const res = await axios.put(`http://localhost:5000/user/changeUsername/${id}`, newUsername);
        //console.log(res);
        dispatch({
            type : GET_USERNAME,
            payload : res.data
        })
        dispatch({
            type : GET_MESSAGE,
            payload : { success : "Username updated successfully"}
        })
        dispatch({
            type : GET_ERRORS,
            payload : {}
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const updateEmail = (newEmail, id) => async dispatch => {

    try{
        const res = await axios.put(`http://localhost:5000/user/changeEmail/${id}`, newEmail);
        //console.log(res);
        dispatch({
            type : GET_EMAIL,
            payload : res.data
        })
        dispatch({
            type : GET_MESSAGE,
            payload : { success : "Email updated successfully"}
        })
        dispatch({
            type : GET_ERRORS,
            payload : {}
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const updatePassword = (newPassword, id) => async dispatch => {

    try{
        const res = await axios.put(`http://localhost:5000/user/changePassword/${id}`, newPassword);
        dispatch({
           type : GET_MESSAGE,
           payload : "Password updated successfully" 
        });
        dispatch({
            type : GET_ERRORS,
            payload : {}
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }
}

export const enableAPIService = (id) => async dispatch => {

    try{
        const res = await axios.put(`http://localhost:5000/user/enableAPIService/${id}`);
        dispatch({
            type : GET_MESSAGE,
            payload : res.data 
         });
         dispatch({
            type : GET_API_STATUS,
            payload : true 
         });
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data 
         });
    }

}