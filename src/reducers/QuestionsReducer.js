import { REQUEST_QUESTIONS, REQUEST_QUESTIONS_SUCESS } from '../actions/QuestionsAction';

const INITIAL_STATE = {
  data: [],
  QuestionsLoading: true,
};

const questionApi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return {
        ...state,
        QuestionsLoading: true,
      };
    case REQUEST_QUESTIONS_SUCESS:
      return {
        ...state,
        QuestionsLoading: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export default questionApi;
