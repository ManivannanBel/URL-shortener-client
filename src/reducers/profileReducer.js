import { GET_USER_DETAILS } from '../actions/types';

const initialState = {};

export default function(state = initialState, actions){
    switch(actions.type){
        case GET_USER_DETAILS:
            return actions.payload;
        
        default:
            return state;
    }
}