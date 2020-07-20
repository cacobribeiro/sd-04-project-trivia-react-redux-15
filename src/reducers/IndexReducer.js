const { INDEX } = require('../actions/FindQuestions');

const INITIAL_STATE = {
  index: 0,
};

const index = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INDEX:
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
};

export default index;
