import * as React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import * as gamesActions from '../store/games/actions';
import * as authActions from '../store/auth/actions';
import * as authSelectors from '../store/auth/reducer';
import { connect } from 'react-redux';



class Header extends React.Component {

  componentDidMount() {
    this.props.dispatch(gamesActions.fetchGames());
  }
  
  logoutHandler() {
    this.props.dispatch(authActions.logout());
  }

  userControls(userName) {
    console.log(userName)
    if (!userName) {
      return (
        <div className="salvo-navbar-links">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )
    } else {
      return (
        <div className="salvo-navbar-links">
          <span>
            <MaterialIcon icon="person" color="inherit" />
            {userName}
          </span>
          <a onClick={this.logoutHandler.bind(this)}>Log Out</a>
        </div>
      )
    }
  }


  render() {
    return (
      <nav className="salvo-navbar">
        <div className="salvo-navbar-links">
          <strong>salvoApp</strong>
          <Link to="/">Games</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
        {this.userControls(this.props.user)}
      </nav>
    );
  }
}

// redux ------------------------------------------------------

function mapStateToProps(state) {

  return {
    user: authSelectors.getUser(state)
  };
}

export default connect(mapStateToProps)(Header);