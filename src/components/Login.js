import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';
import { changeNameAction, changeEmailAction } from '../actions/PlayerAction';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.buttonFunction = this.buttonFunction.bind(this);
  }

  buttonFunction({ gamerName, gamerEmail }) {
    const { getTokenGamer } = this.props;
    return gamerEmail !== '' && gamerName !== '' ? (
      <Link to={'/game-screen'}>
        <button
          type="submit"
          className="button-login"
          data-testid="btn-play"
          onClick={() => getTokenGamer()}
        >
          Jogar
        </button>
      </Link>
    ) : (
      <button className="button-login" type="button" disabled="disabled" data-testid="btn-play">
        Jogar
      </button>
    );
  }

  render() {
    const { gamerEmail, gamerName, score, assertions } = this.props;
    const objeto = { player: { name: gamerName, assertions, score, gravatarEmail: gamerEmail } };
    localStorage.setItem('state', JSON.stringify(objeto));
    return (
      <div className="container-login">
        <label htmlFor="gamerName">Nome do Jogador:</label>
        <input
          type="text"
          required="required"
          name="gamerName"
          data-testid="input-player-name"
          onChange={(e) => this.props.changeName(e.target.value)}
        />
        <label htmlFor="gamerEmail">Email:</label>
        <input
          type="email"
          required="required"
          name="gamerEmail"
          data-testid="input-gravatar-email"
          onChange={(e) => this.props.changeEmail(e.target.value)}
        />
        <div className="container-button">
          {this.buttonFunction({ gamerName, gamerEmail })}
          <Link to="/settings">
            <button className="button-login" data-testid="btn-settings">Settings</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gamerName: state.player.name,
  gamerEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  getTokenGamer: () => dispatch(fetchToken()),
  changeName: (obj) => dispatch(changeNameAction(obj)),
  changeEmail: (obj) => dispatch(changeEmailAction(obj)),
});

Login.propTypes = {
  getTokenGamer: PropTypes.func.isRequired,
  gamerName: PropTypes.string.isRequired,
  gamerEmail: PropTypes.string.isRequired,
  changeName: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
