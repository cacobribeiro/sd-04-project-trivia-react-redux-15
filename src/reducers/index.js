import { combineReducers } from 'redux';
import tokenApi from './tokenApi';

const rootReducer = combineReducers({
  tokenApi,
});

export default rootReducer;
