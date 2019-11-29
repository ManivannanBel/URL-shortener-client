import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import urlReducer from './urlReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import securityReducer from './securityReducer';

export default combineReducers({
    errors : errorReducer,
    url : urlReducer,
    userDetails : profileReducer,
    message : messageReducer,
    auth : securityReducer
})