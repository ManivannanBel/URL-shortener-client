import { GET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MESSAGE:
            return action.payload;
        case CLEAR_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}