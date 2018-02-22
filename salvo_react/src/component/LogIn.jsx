import * as React from 'react';
import './LogIn.css';

class LogIn extends React.Component {
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
      </form>
    );
  }
}

export default LogIn;