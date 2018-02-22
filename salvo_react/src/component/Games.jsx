import * as React from 'react';
import './Games.css';
import { connect } from 'react-redux';
import * as gamesActions from '../store/games/actions';
import * as gamesSelectors from '../store/games/reducer';



class Games extends React.Component {

  componentDidMount() {
    this.props.dispatch(gamesActions.fetchActiveGames());
  }

  render() {
    return (
      <p>Games test</p>
    );
  }
}



// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  console.log(state);
  
  return {
    gamesList: gamesSelectors.getActiveGames(state)
  };
}

export default connect(mapStateToProps)(Games);