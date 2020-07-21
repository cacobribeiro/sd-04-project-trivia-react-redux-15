export const FIND_QUESTIONS_TRUE = 'FIND_QUESTIONS_TRUE';
export const FIND_QUESTIONS_FALSE = 'FIND_QUESTIONS_FALSE';
export const INDEX = 'INDEX';

const findQuestionsTrueAction = () => ({
  type: FIND_QUESTIONS_TRUE,
});

const findQuestionsFalseAction = () => ({
  type: FIND_QUESTIONS_FALSE,
});

const indexAction = (index) => ({
  type: INDEX,
  index,
});

export { findQuestionsFalseAction, findQuestionsTrueAction, indexAction };
