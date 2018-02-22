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
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route path="/game/:gameId" component={Game} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/" component={Games} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default SalvoApp;