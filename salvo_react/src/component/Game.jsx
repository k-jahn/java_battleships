import * as React from 'react';
import './Game.css';
import * as gameActions from '../store/game/actions';
import * as gameSelectors from '../store/game/reducer';
import { connect } from 'react-redux';


class Game extends React.Component {


  componentDidMount() {
    const id = this.props.match.params.gameId;
    this.props.dispatch(gameActions.fetchGameView(id));
  }


  render() {
    console.log()
    return (
      <p>Game test</p>
    );
  }
}


// redux ------------------------------------------------------

function mapStateToProps(state) {
  return {
    game: gameSelectors.getGameView(state)
  };
}

export default connect(mapStateToProps)(Game);