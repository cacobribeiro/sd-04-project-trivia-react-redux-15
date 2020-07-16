import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';

class Login extends Component {
  render() {
    const { getTokenGamer } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="gamer-name">Name
            <input
              type="text" required="required" name="gamer-name" data-testid="input-player-name"
            />
          </label>
          <label htmlFor="gamer-email">Email
            <input
              type="email" required="required" name="gamer-email" data-testid="input-gravatar-email"
            />
          </label>
          <Link to="/game-screen">
            <button type="submit" data-testid="btn-play" onClick={() => getTokenGamer()}>
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button data-testid="btn-settings">
              Settings
            </button>
          </Link>
        </form>
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
