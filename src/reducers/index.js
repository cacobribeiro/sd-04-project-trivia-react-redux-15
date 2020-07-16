import { combineReducers } from 'redux';
import tokenApi from './tokenApi';
import player from './player';

const rootReducer = combineReducers({
  tokenApi,
  player,
});

export default rootReducer;
