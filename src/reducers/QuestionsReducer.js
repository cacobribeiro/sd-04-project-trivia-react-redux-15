import { REQUEST_QUESTIONS, REQUEST_QUESTIONS_SUCESS } from '../actions/QuestionsAction';

const INITIAL_STATES = {
  data: '',
  QuestionsLoading: true,
};

export const questionApi = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return {
        ...state,
        QuestionsLoading: true,
      };
    case REQUEST_QUESTIONS_SUCESS:
      return {
        ...state,
        data: action.data.results,
        QuestionsLoading: false,
      };
    default:
      return state;
  }
};

export default questionApi;
