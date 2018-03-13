import * as React from 'react';
import './SalvoApp.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Game from './Game';
import Games from './Games';
import Leaderboard from './Leaderboard';

class SalvoApp extends React.Component {
  // TODO - preload games and leaderboard from server


  render() {

    return (
      <div className="app">
        <Header />
          <Switch>
            <Route path="/game/:gameId" component={Game} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/games" component={Games} />
            <Redirect from="/" to="games" />
          </Switch>
      </div>
    );
  }
}

export default SalvoApp;