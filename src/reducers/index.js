import { combineReducers } from 'redux';
import tokenApi from './tokenApi';
import player from './player';
import questionApi from './QuestionsReducer';

const rootReducer = combineReducers({
  tokenApi,
  player,
  questionApi,
});

export default rootReducer;
