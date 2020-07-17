import questionsApi from '../services/QuestionsApi';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCESS = 'REQUEST_QUESTIONS_SUCESS';

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const requestQuestionsSucess = (data) => ({
  type: REQUEST_QUESTIONS_SUCESS,
  data,
});

export function fetchQuestions(token) {
  return (dispatch) => {
    dispatch(requestQuestions());

    return questionsApi(token).then((data) => dispatch(requestQuestionsSucess(data)));
  };
}
