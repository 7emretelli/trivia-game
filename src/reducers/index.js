import {combineReducers} from 'redux';
import pageReducer from './pageReducer';
import questionReducer from './questionReducer';

export default combineReducers({
  Page: pageReducer,
  QDATA: questionReducer,
});
