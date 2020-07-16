const { CHANGE_SCORE } = require('../actions/PlayerAction');

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const player = (state = INITIAL_STATE, action) => {
  console.log('score funcionando');
  switch (action.type) {
    case CHANGE_SCORE:
      return { ...state };
    default:
      return state;
  }
};

export default player;
