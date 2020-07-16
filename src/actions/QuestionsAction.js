import QuestionsApi from '../services/QuestionsApi';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCESS = 'REQUEST_QUESTIONS_SUCESS';

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const requestQuestionsSucess = (data) => ({
  type: REQUEST_QUESTIONS_SUCESS,
  data,
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());

    return QuestionsApi().then((results) => dispatch(requestQuestionsSucess(results)));
  };
}
