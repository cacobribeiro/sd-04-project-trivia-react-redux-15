import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';
import { changeScore } from '../actions/PlayerAction';
import { fetchQuestions } from '../actions/QuestionsAction';
import { gravatarImageAction } from '../actions/GravatarImage';
import Questions from './Question';

class Game extends Component {
  constructor(props) {
    super(props);
    this.getAvatar = this.getAvatar.bind(this);
  }
  componentDidUpdate(prevProps) {
    const { getQuestions, token } = this.props;
    if (prevProps.token !== token) {
      getQuestions(token);
    }
  }

  getAvatar() {
    const { gamerEmail, getImage, gravatarImage } = this.props;
    const hash = MD5(gamerEmail.trim().toLowerCase());
    getImage(`https://www.gravatar.com/avatar/${hash}`);
    return (
      <img
        data-testid="header-profile-picture"
        src={gravatarImage}
        alt="avatar"
      />
    );
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
            {this.getAvatar()}
            <p data-testid="header-player-name">Jogador: {gamerName}</p>
            <p data-testid="header-score">Pontos: {score}</p>
          </span>
        </header>
        <Questions />
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
  gravatarImage: state.ImageReducer.gravatarImage,
});

const mapDispatchToProps = (dispatch) => ({
  getScoreGamer: () => dispatch(changeScore()),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
  getImage: (img) => dispatch(gravatarImageAction(img)),
});

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gamerName: PropTypes.string.isRequired,
  gamerEmail: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
