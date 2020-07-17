import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Questions({ data, QuestionsLoading }) {
  const index = 1;
  if (QuestionsLoading) return <p>L O A D I N G . . . </p>;
  if (data[index].type === 'boolean') {
    return (
      <div>
        <div>
          <h2 data-testid="question-text">{data[index].question}</h2>
          <small data-testid="question-category">{data[index].category}</small>
          <small>{data[index].difficulty}</small>
        </div>
        <button>TRUE</button>
        <button>FALSE</button>
      </div>
    );
  }
  const questions = [...data[index].incorrect_answers, data[index].correct_answer].sort();
  return (
    <div>
      <div>
        <h2>{data[index].question}</h2>
        <small>{data[index].category}</small>
        <small>{data[index].difficulty}</small>
      </div>
      {console.log(questions)}
      {questions.map((e, indexWrong) => {
        if (data[index].correct_answer === e) {
          return <button data-testid="correct-answer">{e}</button>;
        }
        return <button data-testid={`wrong-answer-${indexWrong}`}>{e}</button>;
      })}
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
