import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { assertions } = this.props;
    if (assertions > 3) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { gravatarImage, gamerName, score, assertions } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={gravatarImage} alt="avatar" />
        <h2 data-testid="header-player-name">{gamerName}</h2>
        <h2 data-testid="header-score">{score}</h2>
        <h2 data-testid="feedback-text">{this.feedbackMessage()}</h2>
        <h2 data-testid="feedback-total-score">Placar final: {score}</h2>
        <h2 data-testid="feedback-total-question">Total de perguntar respondidas: {assertions}</h2>
        <Link to="/">
          <button data-testid="btn-play-again" type="submit">
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

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  gamerName: PropTypes.string.isRequired,
  assertions: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
