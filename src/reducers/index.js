import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import urlReducer from './urlReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    errors : errorReducer,
    url : urlReducer,
    userDetails : profileReducer
})