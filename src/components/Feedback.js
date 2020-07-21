import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { indexAction } from '../actions/FindQuestions';
import { resetAction } from '../actions/PlayerAction';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    const { gravatarImage, gamerName, score } = this.props;
    const arrayPeople = JSON.parse(localStorage.getItem('ranking'));
    const newGamer = { name: gamerName, score, picture: gravatarImage };
    if (arrayPeople) {
      arrayPeople.push(newGamer);
      localStorage.setItem('ranking', JSON.stringify(arrayPeople));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newGamer]));
    }
  }

  feedbackMessage() {
    const { assertions } = this.props;
    if (assertions < 3) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  handleButton() {
    const { resetIndex, resetPlayer } = this.props;
    resetIndex(0);
    resetPlayer();
  }

  render() {
    const { gravatarImage, gamerName, score, assertions } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={gravatarImage} alt="avatar" />
        <h2 data-testid="header-player-name">{gamerName}</h2>
        <h2 data-testid="header-score">{score}</h2>
        <h2 data-testid="feedback-text">{this.feedbackMessage()}</h2>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <div>
          Total de perguntar respondidas:
          <h2 data-testid="feedback-total-question">{assertions}</h2>
        </div>

        <Link to="/">
          <button data-testid="btn-play-again" type="submit" onClick={() => this.handleButton()}>
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="submit">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  gamerName: state.player.name,
  assertions: state.player.assertions,
  gravatarImage: state.ImageReducer.gravatarImage,
});

const mapDispatchToProps = (dispatch) => ({
  resetIndex: (num) => dispatch(indexAction(num)),
  resetPlayer: () => dispatch(resetAction()),
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  gamerName: PropTypes.string.isRequired,
  assertions: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  resetPlayer: PropTypes.func.isRequired,
  resetIndex: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
