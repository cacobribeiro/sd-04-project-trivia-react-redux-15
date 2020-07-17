import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Questions({ data, QuestionsLoading }) {

  function handleButton(answer) {
    selectAnswer(answer);
  }

  function selectAnswer(answer) {
    console.log('Escolhi a alternativa:');
    console.log(answer);
    const alternatives = document.querySelector('.question-answers').childNodes;
    console.log(alternatives);
    // disabled outras alternativas
    for (let index = 0; index < alternatives.length; index++) {
      if (alternatives[index].innerText !== answer) {
        alternatives[index].disabled = true;
      }
    }
    // mudando o border
    for (let index = 0; index < alternatives.length; index++) {
      if (alternatives[index].id === 'correct-answer') {
        alternatives[index].style.border = '3px solid rgb(6, 240, 15';
      } else {
        alternatives[index].style.border = '3px solid rgb(255, 0, 0)';
      }
    }
  }

  const index = 0;
  if (QuestionsLoading) return <p>L O A D I N G . . . </p>;
  const questions = [...data[index].incorrect_answers, data[index].correct_answer].sort();
  return (
    <div>
      <div>
        <h2 data-testid="question-text">{data[index].question}</h2>
        <small data-testid="question-category">{data[index].category}</small>
      </div>
      <div className="question-answers">
        {questions.map((e, indexWrong) => {
          if (data[index].correct_answer === e) {
            return (
              <button
                id="correct-answer"
                data-testid="correct-answer"
                onClick={() => handleButton(e)}
              >
                {e}
              </button>
            );
          }
          return (
            <button
              id={`wrong-answer-${indexWrong}`}
              data-testid={`wrong-answer-${indexWrong}`}
              onClick={() => handleButton(e)}
            >
              {e}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Questions.propTypes = {
  QuestionsLoading: PropTypes.bool.isRequired,
  data: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.questionApi.data,
  QuestionsLoading: state.questionApi.QuestionsLoading,
});

export default connect(mapStateToProps)(Questions);
