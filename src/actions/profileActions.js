import axios from "axios";
import { GET_USER_DETAILS, GET_ERRORS } from "./types";

export const getUserProfileDetails = (id) => async dispatch => {
    
    try{
        const res = await axios.get(`http://localhost:5000/user/${id}`);
        dispatch({
            type : GET_USER_DETAILS,
            payload : res.data
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}