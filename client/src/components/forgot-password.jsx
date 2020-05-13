import React, { Component } from 'react';
import { Auth as AmplifyAuth } from 'aws-amplify';
import { navigate, Link } from '@reach/router';
import { AUTHENTICATION_ERROR_MESSAGES } from '../core';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      alert: null,
    };
  }

  alert(message, color) {
    this.setState({ alert: { message, color } });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    try {
      this.alert('loading...', 'gray');
      await AmplifyAuth.forgotPassword(this.state.username);
      navigate(`/reset-password?username=${this.state.username}`);
    } catch (error) {
      const message = AUTHENTICATION_ERROR_MESSAGES[error.code] || error.message;
      this.alert(message, 'red');
    }
  }

  render() {
    return (
      <>
        <h3>Forgot Password</h3>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        <Link to="/forgot-username">Forgot Username?</Link>
        {this.state.alert && <div style={{ color: this.state.alert.color }}>{this.state.alert.message}</div>}
      </>
    );
  }
}

export default ForgotPassword;
