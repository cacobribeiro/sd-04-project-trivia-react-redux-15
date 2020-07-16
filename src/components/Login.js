import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { gamerName: '', gamerEmail: '' };
    this.handle = this.handle.bind(this);
    this.buttonFunction = this.buttonFunction.bind(this);
  }

  handle(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  buttonFunction(state) {
    const { getTokenGamer } = this.props;
    return state.gamerEmail !== '' && state.gamerName !== '' ? (
      <Link to="/game-screen">
        <button type="submit" data-testid="btn-play" onClick={() => getTokenGamer()}>
          Jogar
        </button>
      </Link>
    ) : (
      <button type="button" disabled="disabled" data-testid="btn-play">
        Jogar
      </button>
    );
  }

  render() {
    const { handle } = this;
    return (
      <div>
        <label htmlFor="gamerName">
          Name
          <input
            type="text"
            required="required"
            name="gamerName"
            data-testid="input-player-name"
            onChange={(e) => handle(e)}
          />
        </label>
        <label htmlFor="gamerEmail">
          Email
          <input
            type="email"
            required="required"
            name="gamerEmail"
            data-testid="input-gravatar-email"
            onChange={(e) => handle(e)}
          />
        </label>
        {this.buttonFunction(this.state)}
        <Link to="/settings">
          <button data-testid="btn-settings">Settings</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenGamer: () => dispatch(fetchToken()),
});

Login.propTypes = {
  getTokenGamer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
