const { CHANGE_TIME } = require('../actions/TimeAction');

const INITIAL_STATE = {
  time: 30,
};

const ChangeTime = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_TIME:
      return {
        ...state,
        time: action.value,
      };
    default:
      return state;
  }
};

export default ChangeTime;
