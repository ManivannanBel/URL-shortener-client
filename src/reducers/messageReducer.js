import { GET_MESSAGE } from "../actions/types";

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_MESSAGE:
            return action.payload;

        default:
            return state;
    }
}