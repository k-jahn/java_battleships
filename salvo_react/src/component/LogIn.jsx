import * as React from 'react';
import './LogIn.css';
import * as authActions from '../store/auth/actions';
import * as authSelectors from '../store/auth/reducer';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';



class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isSubmitted: false,
      usernameValid: true,
      passwordValid: true,
    }
  }

  inputChangeHandler(e) {
    const validationRegEx = {
      username: /(^[A-Za-z0-9.\-_]+@[A-Za-z0-9.\-_]+\.[A-Za-z]{2,}$)|^$/,
      password: /^.{6,}$/
    }
    const nextState = { ...this.state}
    nextState[e.target.name] = e.target.value
    nextState[`${e.target.name}Valid`] = validationRegEx[e.target.name].test(e.target.value)
    this.setState(nextState)
  }


  submitHandler(evt) {
    evt.preventDefault()
    this.setState({ ...this.state, submitted: true })
    this.props.dispatch(authActions.login(this.state.username, this.state.password))
  }



  render() {
    const submitButton =
      this.state.passwordValid && this.state.usernameValid
        ?
        <button onClick={this.submitHandler.bind(this)}>Log In</button>
        :
        <button
          onClick={e => e.preventDefault()}
          className="inactive">
          {this.state.submitted && !this.props.loginFail ? 'Submitting' : 'Log In'}
        </button>


    return (
      <div className="loginModal">
        <form>
          <p>
            Email
            <span className="errorField">
              {this.state.usernameValid ? null : 'enter valid email'}
            </span>
          </p>
          <p>
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.inputChangeHandler.bind(this)}
            />

          </p>
          <p>
            Password
            <span className="errorField">
              {this.state.passwordValid ? null : 'min 6 char'}
            </span>
          </p>
          <p>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.inputChangeHandler.bind(this)}
            />
          </p>
          {submitButton}
          <span className="errorField">
            {this.props.loginFail  ? 'Log In Failed' : null}
          </span>
        </form>
      </div>

    );
  }

}


function mapStateToProps(state) {

  return {
    user: authSelectors.getUser(state),
    loginFail: authSelectors.getLoginFailed(state)
  };
}

export default connect(mapStateToProps)(LogIn);