import * as React from 'react';
import './Leaderboard.css';
import * as leaderboardActions from '../store/leaderboard/actions';
import * as leaderboardSelectors from '../store/leaderboard/reducer';
import { connect } from 'react-redux';

function drawLeaderboardRow(props) {
  let columns = [];
  for (let column of props.columns) {
    columns.push(<td>{column}</td>)
  }
  return (<tr>{columns}</tr>)
}



class Leaderboard extends React.Component {

  componentDidMount() {
    this.props.dispatch(leaderboardActions.fetchLeaderboard());
  }

  drawLeaderboard() {
    if (!this.props.leaderboard) return null
    const tableRows = this.props.leaderboard
    .map(x => {
      let rowProps = {}
      rowProps.columns=[x.rank, x.email, x.score, x.wins, x.losses, x.ties]
      return drawLeaderboardRow(rowProps)
    })
    return (
      <table>
        <thead>
          <tr>
            <th>
              Rank
            </th>
            <th>
              Email
            </th>
            <th>
              Score
            </th>
            <th>
              Wins
            </th>
            <th>
              Losses
            </th>
            <th>
              Ties
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table >
    )
  }
  
  render() {
    return (
      <main className="leaderboard">
        {this.props.leaderboard ? this.drawLeaderboard() : null}
      </main>
    );
  }
}

// redux --------------------------------------------------

function mapStateToProps(state) {

  return {
    leaderboard: leaderboardSelectors.getRankedLeaderboard(state)
  };

}

export default connect(mapStateToProps)(Leaderboard);