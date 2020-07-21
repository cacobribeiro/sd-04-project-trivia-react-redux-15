import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const arrayPeople = JSON.parse(localStorage.getItem('ranking'));
    const sortScore = arrayPeople.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h2>Ranking</h2>
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
          <button data-testid="btn-go-home" type="submit">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
