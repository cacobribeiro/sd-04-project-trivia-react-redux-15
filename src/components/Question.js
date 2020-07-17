import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { changeScoreAction } from '../actions/PlayerAction';

function Questions({ data, QuestionsLoading, score, changeScore }) {
  function addScore({ score, changeScore, difficulty }) {
    let scoreDifficulty;
    let time = 1;
    if (difficulty === 'hard') scoreDifficulty = 3;
    if (difficulty === 'medium') scoreDifficulty = 2;
    if (difficulty === 'easy') scoreDifficulty = 1;
    let newScore = score + time * scoreDifficulty;
    return changeScore(newScore);
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
      {questions.map((e, indexWrong) => {
        const difficulty = data[index].difficulty;
        if (data[index].correct_answer === e) {
          return (
            <button
              data-testid="correct-answer"
              onClick={() => addScore({ score, changeScore, difficulty })}
            >
              {e}
            </button>
          );
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
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  changeScore: (obj) => dispatch(changeScoreAction(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
