import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import urlReducer from './urlReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    errors : errorReducer,
    url : urlReducer,
    userDetails : profileReducer,
    message : messageReducer
})