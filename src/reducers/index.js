import {combineReducers} from 'redux';
import pageReducer from './pageReducer';
import questionReducer from './questionReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  pageReducer: pageReducer,
  questionReducer: questionReducer,
  profileReducer: profileReducer,
});
