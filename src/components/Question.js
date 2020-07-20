import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { changeScoreAction } from '../actions/PlayerAction';
import ButtonNext from './ButtonNext';
import { findQuestionsTrueAction } from '../actions/FindQuestions';
import { timeAction } from '../actions/TimeAction';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
    this.addScore = this.addScore.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.btNext = this.btNext.bind(this);
  }

  // componentDidMount() {
  //   this.clockQuestion();
  // }

  componentDidUpdate() {
    const { time } = this.props;
    if (time === 0) {
      clearInterval(this.clock);
    }
    if (time === 10) {
      this.clockQuestion();
    }
  }

  selectAnswer(answer) {
    const alternatives = document.querySelector('.question-answers').childNodes;
    // disabled outras alternativas
    for (let index = 0; index < alternatives.length; index += 1) {
      if (alternatives[index].innerText !== answer) {
        alternatives[index].disabled = true;
      }
    }
    // mudando o border
    for (let index = 0; index < alternatives.length; index += 1) {
      if (alternatives[index].id === 'correct-answer') {
        alternatives[index].style.border = '3px solid rgb(6, 240, 15)';
      } else {
        alternatives[index].style.border = '3px solid rgb(255, 0, 0)';
      }
    }
  }

  handleButton(answer, difficulty) {
    this.selectAnswer(answer);
    this.addScore(difficulty);
  }

  addScore(difficulty) {
    const { score, changeScore } = this.props;
    const { clockTimer } = this.state;
    let scoreDifficulty = 1;
    if (difficulty === 'hard') scoreDifficulty = 3;
    if (difficulty === 'medium') scoreDifficulty = 2;
    const newScore = score + scoreDifficulty * clockTimer;
    return changeScore(newScore);
  }

  clockQuestion() {
    this.clock = setInterval(() => {
      const { time, changeTime } = this.props;
      changeTime(time - 1);
    }, 1000);
  }

  btNext() {
    const { time } = this.props;
    if (time === 0) {
      return <ButtonNext setinterval={this.clockQuestion} />;
    }
  }

  render() {
    const { data, QuestionsLoading, time, index } = this.props;
    if (QuestionsLoading) return <p>L O A D I N G . . . </p>;
    const questions = [...data[index].incorrect_answers, data[index].correct_answer].sort();
    return (
      <div>
        <div>
          <p> Remaining: {time}</p>
          <h2 data-testid="question-text">{data[index].question}</h2>
          <small data-testid="question-category">{data[index].category}</small>
        </div>
        <div className="question-answers">
          {questions.map((e, indexWrong) => {
            const difficulty = data[index].difficulty;
            if (data[index].correct_answer === e) {
              return (
                <button
                  data-testid="correct-answer"
                  id="correct-answer"
                  onClick={() => this.handleButton(e, difficulty)}
                >
                  {e}
                </button>
              );
            }
            return (
              <button
                data-testid={`wrong-answer-${indexWrong}`}
                onClick={() => this.selectAnswer(e)}
              >
                {e}
              </button>
            );
          })}
        </div>
        {this.btNext()}
      </div>
    );
  }
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
  time: state.ChangeTime.time,
  index: state.index.index,
});

const mapDispatchToProps = (dispatch) => ({
  changeScore: (obj) => dispatch(changeScoreAction(obj)),
  showButton: () => dispatch(findQuestionsTrueAction()),
  changeTime: (time) => dispatch(timeAction(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
