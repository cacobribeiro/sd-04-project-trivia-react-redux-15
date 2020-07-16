import { REQUEST_TOKEN, RECEIVE_TOKEN } from '../actions/';

const INITIAL_STATE = {
  isFetching: true,
};

const tokenApi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TOKEN:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TOKEN:
      return {
        ...state,
        isFetching: false,
        token: action.token,
      };
    default:
      return state;
  }
};

export default tokenApi;
