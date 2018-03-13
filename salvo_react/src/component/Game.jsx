import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import * as gameActions from '../store/game/actions';
import * as gameSelectors from '../store/game/reducer';
import * as authSelectors from '../store/auth/reducer';
import './Game.css';




// dumb components ------------
const Board = function (game, role) {
  // build grid
  let rows = []
  for (let row = 0; row <= 10; row++) {
    let cells = []
    for (let col of ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
      const salvoes = game.opponent ? (game.salvoes[game[role === 'player' ? 'opponent' : 'player'].id] || {}) : {}
      let cellProps = {
        salvo: Object.keys(salvoes).some(x => salvoes[x].some(y => y === col + row)),
        ship: (role === 'player' && game.ships.some(x => x.locations.some(y => y === col + row))),
        hit: false,
      }
      cells.push(Cell(col, row, cellProps))
    }
    rows.push(<div className="board_row">{cells}</div>)
  }

  // insert ship overlays
  let shipsOverlays = []
  if (role === 'player') {
    for (let ship of game.ships) {
      const cellSize = 40
      const shipLoc = [ship.locations[0].charCodeAt(0) - 64, +ship.locations[0].match(/\d+/)[0]]
      const shipSize = [1 + ship.locations[ship.locations.length - 1].charCodeAt(0) - 64 - shipLoc[0],
      1 + +ship.locations[ship.locations.length - 1].match(/\d+/)[0] - shipLoc[1]]
      console.log(ship, shipSize, shipLoc)
      const shipStyle = {
        'height': `${shipSize[1] * cellSize - 8}px`,
        'width': `${shipSize[0] * cellSize - 8}px`,
        'transform': `translate(${shipLoc[0] * cellSize + 4}px, ${shipLoc[1] * cellSize + 4}px)`,
      }
      shipsOverlays.push((<div className="ship_overlay" style={shipStyle} />))
    }
  }

  return (<div className="board_container">{rows}{shipsOverlays}</div>)
}

const Cell = function (col, row, props) {
  if (!row) return (<div className="board_cell legend">{col}</div>)
  if (!col) return (<div className="board_cell legend">{row}</div>)
  return (<div className={`board_cell field ${props.ship ? 'ship' : ''}`}>{props.salvo ? <MaterialIcon icon="clear" color="red" size={30} />
    : null}</div>)
}

const UserInterface = function(game) {
  if (!game.ships.length) {
    return (<div className="userInterface">No ships yet!</div>)
  }
}

class Game extends React.Component {
  componentDidMount() {
    this.props.dispatch(gameActions.fetchGame(this.props.match.params.gameId));
  }
  
  
  
  render() {
    if (!this.props.user) return (<Redirect to="/" />)
    if (this.props.game) {
      return (
        <main className="game_view">
          <div className="game_wrapper">
            <div>
              <h3>Player: <em>{this.props.game.player.player.email}</em></h3>
              {Board(this.props.game, 'player')}
            </div>
            <div>
              <h3>Opponent: <em>{this.props.game.opponent ? this.props.game.opponent.player.email : 'waiting for join'}</em></h3>
              {Board(this.props.game, 'opponent')}
            </div>
          </div>
          {UserInterface(this.props.game)}
        </main>
      );
    }
    
    
    
    return (
      <main className="game_view">
        {/* insert spinner here */}
      </main>
    )
  }
}


// redux ------------------------------------------------------

function mapStateToProps(state, props) {
  console.log(state, props.match.params.gameId)
  return {
    game: gameSelectors.getGameView(state, props.match.params.gameId),
    user: authSelectors.getUser(state)
  };
}

// @DragDropContext(HTML5Backend)
export default connect(mapStateToProps)(Game);