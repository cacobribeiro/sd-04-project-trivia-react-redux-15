import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeScore } from '../actions/PlayerAction';

class Game extends Component {
  componentDidMount() {
    const { getScoreGamer } = this.props;
    getScoreGamer();
  }

  render() {
    const { token, isFetching, score, gamerName } = this.props;
    if (isFetching) return <div>Loading</div>;
    localStorage.setItem('token', token);
    return (
      <div>
        Jogo
        <header>
          <span>
            <img data-testid="header-profile-picture" alt="avatar" />
            <p data-testid="header-player-name">Jogador: {gamerName}</p>
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
  gamerName: state.player.name,
  gamerEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  getScoreGamer: () => dispatch(changeScore()),
});

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  getScoreGamer: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  gamerName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
