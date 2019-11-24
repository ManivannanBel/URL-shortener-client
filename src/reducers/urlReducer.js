import { GET_SHORT_URL, GET_URLS_LIST } from "../actions/types";

const initialState = {
    shortUrl : "",
    urlList : []
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_SHORT_URL:
            return {
                ...state,
                shortUrl : action.payload
            };
        case GET_URLS_LIST:
            return {
                ...state,
                urlList : action.payload
            };

        default:
            return state;
    }
}