import { GET_USER_DETAILS, GET_USERNAME, GET_EMAIL } from '../actions/types';

const initialState = {};

export default function(state = initialState, actions){
    switch(actions.type){
        case GET_USER_DETAILS:
            return actions.payload;
        case GET_USERNAME:
            return {
                ...state,
                username : actions.payload.username
            };
        case GET_EMAIL:
            return {
                ... state,
                email : actions.payload.email
            };
        default:
            return state;
    }
}