import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, GET_MESSAGE } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const createUser = (newUser, history) => async dispatch => {

    try{
        const res = await axios.post("https://kut-ty.herokuapp.com/user/register", newUser);
        history.push("/signin");
        dispatch({
            type : GET_MESSAGE,
            payload : res.data
        })
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

export const loginUser = (loginCreds, history) => async dispatch => {

    try{    
        const res = await axios.post("https://kut-ty.herokuapp.com/user/login", loginCreds);

        const token = res.data.token;
        //save to local storage
        localStorage.setItem('jwtToken', token);
        //set token to auth header
        setAuthToken(token);
        //Decode token
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}

//Set logged in user 
export const setCurrentUser = decoded => {
    return({
        type : SET_CURRENT_USER,
        payload : decoded
    })
}

//Logout
export const logout = () => dispatch => {
    //Remove token
    localStorage.removeItem("jwtToken");
    //Remove auth header
    setAuthToken(false);
    //Set current user to {} to set isAuthenticated to false
    dispatch(setCurrentUser({}))
}