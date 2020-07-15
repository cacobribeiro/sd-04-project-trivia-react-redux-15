import getTokenGamer from '../services/index';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const receiveTokenSuccess = ({ token }) => ({
  type: RECEIVE_TOKEN,
  token,
});

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());

    return getTokenGamer()
      .then(
        (results) => dispatch(receiveTokenSuccess(results)),
      );
  };
}
