import * as React from 'react';
import './Header.css';
import { NavLink, withRouter } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';
import * as gamesActions from '../store/games/actions';
import * as authActions from '../store/auth/actions';
import * as authSelectors from '../store/auth/reducer';
import { connect } from 'react-redux';
import LogIn from './LogIn';
import SignUp from './SignUp';



class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }


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
          <a
            onClick={_ => this.setState({ ...this.state, modal: this.state.modal !== 'login' ? 'login' : false })}
            className={this.state.modal === 'login'? 'active' : null}
          >
            Log In
          </a>
          <a
            onClick={_ => this.setState({ ...this.state, modal: this.state.modal !== 'signup' ? 'signup' : false })}
            className={this.state.modal === 'signup' ? 'active' : null}
          >
            Sign Up
          </a>
        </div>
      )
    } else {
      return (
        <div className="salvo-navbar-links">
          <span>
            <MaterialIcon icon="person" color="inherit" size={28} />
            {userName}
          </span>
          <a onClick={this.logoutHandler.bind(this)}>Log Out</a>
        </div>
      )
    }
  }

  authModal() {
    if (this.state.modal && !this.props.user) {
      return (
        <div className="modalCover" onClick={_ => this.setState({ ...this.state, modal: false })}>
          <div className="modalWrapper" onClick={_ => _.stopPropagation()}>
            {this.state.modal === 'login' ? <LogIn /> : <SignUp />}
          </div>
        </div>
      );
    }
  }



  render() {
    return (
      <nav className="salvo-navbar">
        <div className="salvo-navbar-links">
          <strong>salvoApp</strong>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </div>
        {this.userControls(this.props.user)}
        {this.authModal()}
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

export default withRouter(connect(mapStateToProps)(Header));