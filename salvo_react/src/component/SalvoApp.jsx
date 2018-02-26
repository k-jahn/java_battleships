import * as React from 'react';
import './SalvoApp.css';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import Game from './Game';
import Games from './Games';
import Leaderboard from './Leaderboard';
import SignUp from './SignUp';
import LogIn from './LogIn';

class SalvoApp extends React.Component {
  // TODO - preload games and leaderboard from server


  render() {
    return (
      <div className="app">
        <Header />
          <Switch>
            <Route path="/game/:gameId" component={Game} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/" component={Games} />
          </Switch>
      </div>
    );
  }
}

export default SalvoApp;