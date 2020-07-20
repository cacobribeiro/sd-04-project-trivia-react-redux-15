import { combineReducers } from 'redux';
import tokenApi from './tokenApi';
import player from './player';
import questionApi from './QuestionsReducer';
import ImageReducer from './ImageReducer';

const rootReducer = combineReducers({
  tokenApi,
  player,
  questionApi,
  ImageReducer,
});

export default rootReducer;
