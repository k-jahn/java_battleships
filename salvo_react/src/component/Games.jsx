import * as React from 'react';
import './Games.css';
import { connect } from 'react-redux';
import * as gamesActions from '../store/games/actions';
import * as gamesSelectors from '../store/games/reducer';



class Games extends React.Component {

  componentDidMount() {
    this.props.dispatch(gamesActions.fetchGames());
  }

  renderActiveGamesList() {
    const games = this.props.activeGames.map(x=> 
      (
        <li key={`activegame_${x.id}`}>
          {new Date(x.creationDate).toLocaleString()}
          <span> {x.gamePlayers[0].player.email} </span>
          { x.gamePlayers[1] ? <strong> vs. </strong> : null }
          {x.gamePlayers[1] ? <span> {x.gamePlayers[1].player.email} </span> : null }
        </li>
      )
    )
    
    return (
      <ol>{games}</ol>
    )
  }
  
  
  render() {
    return (
      <main className="games">
        <h2>Active Games</h2>
        {this.props.activeGames ? this.renderActiveGamesList() : <h2>Loading...</h2>}
      </main>
    );
  }
}



// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  
  console.log(gamesSelectors.getActiveGames(state))
  return {
    activeGames: gamesSelectors.getActiveGames(state)
  };
}

export default connect(mapStateToProps)(Games);