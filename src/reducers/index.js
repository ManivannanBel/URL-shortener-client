import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import urlReducer from './urlReducer';

export default combineReducers({
    errors : errorReducer,
    url : urlReducer
})