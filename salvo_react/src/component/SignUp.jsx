import * as React from 'react';
import { connect } from 'react-redux';


import * as authActions from '../store/auth/actions';
import * as authSelectors from '../store/auth/reducer';

import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordRepeat: '',
      submitted: false,
      usernameValid: true,
      passwordLengthValid: true,
      passwordCaseValid: true,
      passwordNumberValid: true,
      passwordRepeatValid: true,
    }
  }

  // TODO - make DRY
  usernameChangeHandler(e) {
    const emailRegEx = /(^[A-Za-z0-9.\-_]+@[A-Za-z0-9.\-_]+\.[A-Za-z]{2,}$)|(^$)/
    const nextState = { ...this.state, usernameValid: emailRegEx.test(e.target.value) }
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }
  passwordChangeHandler(e) {
    const pwLengthRegEx = /^.{6,}$/
    const pwLetterRegEx = /^(?=.*[a-z])(?=.*[A-Z])/
    const pwNumberRegEx = /\d/
    const nextState = {
      ...this.state,
      passwordLengthValid: pwLengthRegEx.test(e.target.value),
      passwordCaseValid: pwLetterRegEx.test(e.target.value),
      passwordNumberValid: pwNumberRegEx.test(e.target.value),
    }
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }
  passwordRepeatChangeHandler(e) {
    const nextState = { ...this.state, passwordRepeatValid: e.target.value === this.state.password }
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }


  submitHandler(evt) {
    evt.preventDefault()
    this.setState({ ...this.state, submitted: true })
    this.props.dispatch(authActions.signup(this.state.username, this.state.password))
  }

  render() {
    const submitButton =
      this.state.passwordLengthValid
        && this.state.passwordCaseValid
        && this.state.passwordNumberValid
        && this.state.usernameValid
        && this.state.passwordRepeatValid
        ?
        <button onClick={this.submitHandler.bind(this)}>Sign Up</button>
        :
        <button
          onClick={e => e.preventDefault()}
          className="inactive">
          {this.state.submitted && !this.props.signupFail ? 'Submitting' : 'Sign Up'}
        </button>


    return (
      <form>
        <p>
          Email

        </p>
        <p>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.usernameChangeHandler.bind(this)}
          />
          <br />
          <span className="errorField">
            {this.state.usernameValid ? ' ' : 'enter valid email'}
          </span>
        </p>
        <p>
          Password
                  </p>
        <p>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.passwordChangeHandler.bind(this)} />
          <br />
          <span className="errorField">
            {!this.state.passwordLengthValid
              ?
              'min 6 char'
              : (
                !this.state.passwordCaseValid
                  ?
                  'upper- and lowercase chars'
                  : (
                    this.state.passwordCaseValid ? ' ' : 'must contain number'
                  )
              )
            }
          </span>
        </p>
        <p>
          Repeat
        </p>
        <p>
          <input
            type="password"
            name="passwordRepeat"
            value={this.state.passwordRepeat}
            onChange={this.passwordRepeatChangeHandler.bind(this)} />
          <br />
          <span className="errorField">
            {this.state.passwordRepeatValid ? null : 'passwords do not match'}
          </span>
        </p>
        {submitButton}
      </form>
    );
  }
}

function mapStateToProps(state) {

  return {
    user: authSelectors.getUser(state),
    dignupFail: authSelectors.getSignupFailed(state)
  };
}

export default connect(mapStateToProps)(SignUp);