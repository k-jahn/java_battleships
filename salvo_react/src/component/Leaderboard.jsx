import * as React from 'react';
import './Leaderboard.css';
import * as leaderboardActions from '../store/leaderboard/actions';
import * as leaderboardSelectors from '../store/leaderboard/reducer';
import { connect } from 'react-redux';



function renderLeaderboardRow(props) {
  const columns = props.columns.map((c, i) => <td key={`leaderboard_${props.id}_${i}`}>{c}</td>)
  return (<tr key={`leaderboard_${props.id}`}>{columns}</tr>)
}

class Leaderboard extends React.Component {
  // get data from server on mount
  componentDidMount() {
    this.props.dispatch(leaderboardActions.fetchLeaderboard());
  }


  
  renderLeaderboard() {
    if (!this.props.leaderboard) return null
    const tableRows = this.props.leaderboard
    .map(x => {
      let rowProps = {
        id: x.id,
        columns: [x.rank, x.email, x.score, x.wins, x.losses, x.ties]
      };
      return renderLeaderboardRow(rowProps)
    })
    return (
      <table>
        <thead>
          <tr>
            <th> Rank </th>
            <th> Email </th>
            <th> Score </th>
            <th> Wins </th>
            <th> Losses </th>
            <th> Ties </th>
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
        {this.props.leaderboard ? this.renderLeaderboard() : <h2>Loading...</h2>}
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