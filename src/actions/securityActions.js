import axios from "axios";
import { GET_ERRORS } from "./types";

export const createUser = (newUser, history) => async dispatch => {

    try{
        const res = await axios.post("http://localhost:5000/user/register", newUser);
        history.push("/signin");
    }catch(err){
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    }

}