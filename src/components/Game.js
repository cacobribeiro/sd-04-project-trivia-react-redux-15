import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import changeScore from '../actions/PlayerAction';
import { fetchQuestions } from '../actions/QuestionsAction';

class Game extends Component {
  componentDidMount() {
    const { getScoreGamer, getQuestions } = this.props;
    getScoreGamer();
    getQuestions();
  }

  render() {
    const { token, isFetching, score } = this.props;
    if (isFetching) return <div>Loading</div>;
    localStorage.setItem('token', token);
    return (
      <div>
        Jogo
        <header>
          <span>
            <img data-testid="header-profile-picture" alt="avatar" />
            <p data-testid="header-player-name">Jogador: </p>
            <p data-testid="header-score">Pontos: {score}</p>
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.tokenApi.isFetching,
  token: state.tokenApi.token,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  getScoreGamer: () => dispatch(changeScore()),
  getQuestions: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
