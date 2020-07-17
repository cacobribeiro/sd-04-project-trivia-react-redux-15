import React from 'react';
import { connect } from 'react-redux';

function Questions({ data, QuestionsLoading }) {
  let index = 1;
  if (QuestionsLoading) return <p>L O A D I N G . . . </p>;
  if (data[index].type === 'boolean')
    return (
      <div>
        <div>
          <h2>{data[index].question}</h2>
          <small>{data[index].category}</small>
          <small>{data[index].difficulty}</small>
        </div>
        <button>TRUE</button>
        <button>FALSE</button>
      </div>
    );

  const questions = [...data[index].incorrect_answers, data[index].correct_answer].sort();
  return (
    <div>
      <div>
        <h2>{data[index].question}</h2>
        <small>{data[index].category}</small>
        <small>{data[index].difficulty}</small>
      </div>
      {questions.map((e) => (
        <button>{e}</button>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.questionApi.data,
  QuestionsLoading: state.questionApi.QuestionsLoading,
});

export default connect(mapStateToProps)(Questions);
