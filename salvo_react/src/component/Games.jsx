import * as React from 'react';
import './Games.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import MaterialIcon from 'material-icons-react';
import * as gamesActions from '../store/games/actions';
import * as gameActions from '../store/game/actions';
import * as gamesSelectors from '../store/games/reducer';
import * as authSelectors from '../store/auth/reducer'


class Games extends React.Component {

  componentDidMount() {
    this.props.dispatch(gamesActions.fetchGames());
  }

  renderActiveGamesList(games, user) {
    console.log(games, user)
    const player = function (player) {
      if (player) return (
        <span className="player">
          <MaterialIcon icon={player.player.email === user ? 'person' : 'person_outline'} />
          {player.player.email}
        </span>
      )
      return (
        <span className="player empty">
          empty
        </span>
      )
    }
    const gamesList = games.map(game =>
      (
        <tr key={`activegame_${game.id}`}>
          <td>
            <MaterialIcon icon="event" />
            {new Date(game.creationDate).toLocaleDateString()}
            <br />
            <MaterialIcon icon="access_time" />
            {new Date(game.creationDate).toLocaleTimeString()}
          </td>
          <td>
            {player(game.gamePlayers[0], user)}
          </td>
          <td>
            <strong>
              vs.
            </strong>
          </td>
          <td>
            {player(game.gamePlayers[1], user)}
          </td>

          <td>

            {this.props.user
              && game.gamePlayers.length === 1
              && game.gamePlayers[0].player.email !== this.props.user
              ?
              <a href="/" onClick={_ => this.joinGame(_, game.id)}>Join</a>
              :
              null}
            {
              game.gamePlayers.map(gp => gp.player.email === this.props.user
                ?
                <Link to={`/game/${gp.id}`}>Open</Link>
                :
                null
              )
            }
          </td>
        </tr>
      )
    )

    return (
      <table>
        <tbody>
          {gamesList}
        </tbody>
      </table>
    )
  }
  renderPastGamesList(games) {
    const gamesList = games.map(game =>
      (
        <li key={`pastgame_${game.id}`}>
          {new Date(game.creationDate).toLocaleString()}
          <span> {game.gamePlayers[0].player.email} </span>
          {game.gamePlayers[1] ? <strong> vs. </strong> : null}
          {game.gamePlayers[1] ? <span> {game.gamePlayers[1].player.email} </span> : null}
          {
            game.gamePlayers.map(gp => gp.player.email === this.props.user ?
              <Link to={`/game/${gp.id}`}>View Board</Link> :
              null
            )
          }
          <br />
          winner:
        </li>
      )
    )

    return (
      <ol>{gamesList}</ol>
    )
  }

  joinGame(e, id) {
    e.preventDefault()
    this.props.dispatch(gameActions.joinGame(id))
  }

  createGame(e) {
    e.preventDefault()
    this.props.dispatch(gameActions.createGame())
  }


  render() {
    return (
      <main className="games">
        {this.props.user ? <a href="/" onClick={_ => this.createGame(_)} >Create Game</a> : null}
        <h2>Active Games</h2>
        {this.props.activeGames ? this.renderActiveGamesList(this.props.activeGames, this.props.user) : <h2>Loading...</h2>}
        {this.props.user ? <h2>Past Games</h2> : ''}
        {this.props.user ? this.renderPastGamesList(this.props.pastGames) : ''}
      </main>
    );
  }
}

// redux ------------------------------------------------------

function mapStateToProps(state) {
  console.log(state)
  return {
    activeGames: gamesSelectors.getActiveGames(state),
    pastGames: gamesSelectors.getPastGames(state),
    user: authSelectors.getUser(state),
  };
}

export default connect(mapStateToProps)(Games);
