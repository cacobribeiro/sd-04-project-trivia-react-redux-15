const { GRAVATAR_IMAGE } = require('../actions/GravatarImage');

const INITIAL_STATE = {
  gravatarImage: '',
};

const image = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GRAVATAR_IMAGE:
      return {
        ...state,
        gravatarImage: action.gravatarImage,
      };
    default:
      return state;
  }
};

export default image;
