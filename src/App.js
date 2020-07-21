import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import './style.css';
import Login from './components/Login';
import Settings from './components/Settings';
import Game from './components/Game';
import Feedback from './components/Feedback';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/game-screen" component={Game} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/" component={Login} />
          </header>
        </div>
      </Switch>
    </BrowserRouter>
  );
}
