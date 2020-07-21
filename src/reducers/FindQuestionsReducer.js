const { FIND_QUESTIONS_TRUE, FIND_QUESTIONS_FALSE } = require('../actions/FindQuestions');

const INITIAL_STATE = {
  findQuestions: false,
};

const FindQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIND_QUESTIONS_FALSE:
      return {
        ...state,
        findQuestions: false,
      };
    case FIND_QUESTIONS_TRUE:
      return {
        ...state,
        findQuestions: true,
      };
    default:
      return state;
  }
};

export default FindQuestions;
