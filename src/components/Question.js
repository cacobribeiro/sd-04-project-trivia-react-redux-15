import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { changeScoreAction } from '../actions/PlayerAction';
import ButtonNext from './ButtonNext';
import { findQuestionsTrueAction } from '../actions/FindQuestions';
import { timeAction } from '../actions/TimeAction';
import { disabledBtn, enableBtn } from '../services/DisabledButtons';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
    this.addScore = this.addScore.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.btNext = this.btNext.bind(this);
  }

  componentDidUpdate() {
    const { time, showButton } = this.props;
    if (time === 0) {
      disabledBtn();
      showButton();
      clearInterval(this.clock);
    }
    if (time === 30) {
      enableBtn();
      this.clockQuestion();
    }
  }

  selectAnswer(answer) {
    const { showButton } = this.props;
    showButton();
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
    const { score, changeScore, time } = this.props;
    let scoreDifficulty = 1;
    if (difficulty === 'hard') scoreDifficulty = 3;
    if (difficulty === 'medium') scoreDifficulty = 2;
    const newScore = score + scoreDifficulty * time;
    return changeScore(newScore);
  }

  clockQuestion() {
    this.clock = setInterval(() => {
      const { time, changeTime } = this.props;
      changeTime(time - 1);
    }, 1000);
  }

  btNext() {
    const { findQuestions } = this.props;
    if (findQuestions === true) {
      clearInterval(this.clock);
      return <ButtonNext setinterval={this.clockQuestion} />;
    }
    return null;
  }

  render() {
    const { data, QuestionsLoading, time, index } = this.props;
    if (QuestionsLoading) return <p>L O A D I N G . . . </p>;
    if (index > 4) return <Redirect to="/feedback" />;
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
                  className="btn-answer"
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
                className="btn-answer"
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
  changeScore: PropTypes.func.isRequired,
  changeTime: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
  findQuestions: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  showButton: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.questionApi.data,
  QuestionsLoading: state.questionApi.QuestionsLoading,
  score: state.player.score,
  time: state.ChangeTime.time,
  index: state.index.index,
  findQuestions: state.FindQuestions.findQuestions,
});

const mapDispatchToProps = (dispatch) => ({
  changeScore: (obj) => dispatch(changeScoreAction(obj)),
  showButton: () => dispatch(findQuestionsTrueAction()),
  changeTime: (time) => dispatch(timeAction(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
