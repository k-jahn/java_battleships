import * as React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
  render() {
    return (
      <form>
        <p>
          Email:
        </p>
        <p>
          <input type="text" />
        </p>
        <p>
          Password:
        </p>
        <p>
          <input type="text" />
        </p>
        <p>
          Repeat Password:
        </p>
        <p>
          <input type="text" />
        </p>
      </form>
    );
  }
}

export default SignUp;