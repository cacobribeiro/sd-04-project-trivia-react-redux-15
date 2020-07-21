import { combineReducers } from 'redux';
import tokenApi from './tokenApi';
import player from './player';
import questionApi from './QuestionsReducer';
import ImageReducer from './ImageReducer';
import FindQuestions from './FindQuestionsReducer';
import index from './IndexReducer';
import ChangeTime from './ChangeTime';


const rootReducer = combineReducers({
  tokenApi,
  player,
  questionApi,
  ImageReducer,
  FindQuestions,
  index,
  ChangeTime,
});

export default rootReducer;
