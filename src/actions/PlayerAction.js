export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const RESET = 'RESET';

const changeScoreAction = (changeScore) => ({
  type: CHANGE_SCORE,
  changeScore,
});

const changeNameAction = (changeName) => ({
  type: CHANGE_NAME,
  changeName,
});

const changeEmailAction = (changeEmail) => ({
  type: CHANGE_EMAIL,
  changeEmail,
});

const resetAction = () => ({
  type: RESET,
});

export { changeScoreAction, changeNameAction, changeEmailAction, resetAction };
