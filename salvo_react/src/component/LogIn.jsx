import * as React from 'react';
import './LogIn.css';
import * as authActions from '../store/auth/actions';
import * as authSelectors from '../store/auth/reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    username: '',
    password: '',
    submitted: false,
  }

  inputChangeHandler(e) {
    let nextState = { ...this.state };
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }


  submitHandler(evt) {
    evt.preventDefault()
    let nextState = { ...this.state };
    nextState.submitted = true;
    this.setState(nextState)
    // todo: validation
    this.props.dispatch(authActions.login(this.state.username, this.state.password))
    // authActions.login(this.state.username,this.state.password)

  }



  render() {
    if (!this.props.user) {
      return (
        <main>
          {this.state.submitted ? 'submitting...' :
            <form>
              <p>
                Email:
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
                Password:
          </p>
              <p>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.inputChangeHandler.bind(this)}
                />
              </p>
              <button onClick={this.submitHandler.bind(this)}>Log In</button>
            </form>}
        </main>

      );
    } else {
      return (<Redirect  to="/"/>)
    }
  } 

}


function mapStateToProps(state) {

  return {
    user: authSelectors.getUser(state)
  };
}

export default connect(mapStateToProps)(LogIn);