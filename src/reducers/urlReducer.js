import { GET_SHORT_URL, GET_URLS_LIST, CLEAR_SHORT_URL, ADD_TO_URL_LIST, DELETE_SHORT_URL } from "../actions/types";

const initialState = {
    shortUrl : "",
    urlList : []
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_SHORT_URL:
            //if(!action.payload.url.notUpdateList)    
            return {
                ...state,
                shortUrl : action.payload.url.shortened_url
            };
        case GET_URLS_LIST:
            return {
                ...state,
                urlList : action.payload
            };
        case ADD_TO_URL_LIST:
            state.urlList.push(action.payload)
            return state;
        case CLEAR_SHORT_URL:
            return {
                ...state,
                shortUrl : action.payload
            }
        case DELETE_SHORT_URL:
            return {
                ...state,
                urlList : state.urlList.filter(url => url.shortened_url !== action.payload)
            }
        default:
            return state;
    }
}