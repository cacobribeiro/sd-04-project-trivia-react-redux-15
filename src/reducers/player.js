const { CHANGE_SCORE, CHANGE_NAME, CHANGE_EMAIL } = require('../actions/PlayerAction');

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  console.log('score funcionando');
  switch (action.type) {
    case CHANGE_SCORE:
      return { ...state };
    case CHANGE_NAME:
      console.log(action);
      return {
        ...state,
        name: action.changeName,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        gravatarEmail: action.changeEmail,
      };
    default:
      return state;
  }
};

export default player;
