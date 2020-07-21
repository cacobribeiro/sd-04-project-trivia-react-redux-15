import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { indexAction } from '../actions/FindQuestions';
import { resetAction } from '../actions/PlayerAction';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    const { resetIndex, resetPlayer } = this.props;
    resetIndex(0);
    resetPlayer();
  }
  render() {
    const arrayPeople = JSON.parse(localStorage.getItem('ranking'));
    const sortScore = arrayPeople.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <div>
          {sortScore.map((person, index) => (
            <span>
              <img src={person.picture} alt={person.picture} />
              <h2 data-testid={`player-name-${index}`}>{person.name}</h2>
              <h2 data-testid={`player-score-${index}`}>{person.score}</h2>
            </span>
          ))}
        </div>
        <Link to="/">
          <button data-testid="btn-go-home" type="submit" onClick={() => this.handleButton()}>
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  resetIndex: PropTypes.func.isRequired,
  resetPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetIndex: (num) => dispatch(indexAction(num)),
  resetPlayer: () => dispatch(resetAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
