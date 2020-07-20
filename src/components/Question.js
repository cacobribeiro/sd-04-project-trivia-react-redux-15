import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { changeScoreAction } from '../actions/PlayerAction'; 

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockTimer: 30,
      index: 0,
    };
    this.timerQuestion = this.timerQuestion.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  componentDidMount() {
    this.timerQuestion();
    this.clockQuestion();
  }

  componentDidUpdate() {
    const { index, clockTimer } = this.state;
    if (index === 4) {
      clearInterval(this.timer, this.clock);
    }
    if (clockTimer === 0 && index === 4) {
      clearInterval(this.clock);
    }
  }
  
   addScore(difficulty) {
    let scoreDifficulty = 1;
    if (difficulty === 'hard') scoreDifficulty = 3;
    if (difficulty === 'medium') scoreDifficulty = 2;
    const newScore = score + scoreDifficulty;
    return changeScore(newScore);
  }

  function handler(difficulty) {
    addScore(difficulty);
  }

  clockQuestion() {
    this.setState({ clockTimer: 30 });
    this.clock = setInterval(() => {
      const { clockTimer } = this.state;
      this.setState({ clockTimer: clockTimer - 1 });
    }, 1000);
  }

  timerQuestion() {
    this.timer = setInterval(() => {
      const { index } = this.state;
      this.setState({ index: index + 1, clockTimer: 30 });
    }, 30000);
  }

  render() {
    const { data, QuestionsLoading,  score, changeScore } = this.props;
    const { index, clockTimer } = this.state;
    if (QuestionsLoading) return <p>L O A D I N G . . . </p>;
    const questions = [...data[index].incorrect_answers, data[index].correct_answer].sort();
    return (
      <div>
        <div>
          <p> Remaining: {clockTimer}</p>
          <h2 data-testid="question-text">{data[index].question}</h2>
          <small data-testid="question-category">{data[index].category}</small>
        </div>
        {questions.map((e, indexWrong) => {
        const difficulty = data[index].difficulty;   
      if (data[index].correct_answer === e) {
            return <button data-testid="correct-answer" onClick={() => handler(difficulty)}>{e}</button>;
          }
          return <button data-testid={`wrong-answer-${indexWrong}`}>{e}</button>;
        })}
      </div>
}

Questions.propTypes = {
  QuestionsLoading: PropTypes.bool.isRequired,
  data: PropTypes.string.isRequired,
  changeScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
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
