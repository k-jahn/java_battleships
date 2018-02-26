import * as React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';

class Header extends React.Component {

  userControls(userName) {
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
          <Link to="/">Log Out</Link>
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
        {this.userControls('henry')}
      </nav>
    );
  }
}

export default Header;