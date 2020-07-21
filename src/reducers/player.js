const { CHANGE_SCORE, CHANGE_NAME, CHANGE_EMAIL, RESET } = require('../actions/PlayerAction');

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.changeScore,
        assertions: state.assertions + 1,
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.changeName,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        gravatarEmail: action.changeEmail,
      };
    case RESET:
      return {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      };
    default:
      return state;
  }
};

export default player;
