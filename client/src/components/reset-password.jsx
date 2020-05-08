import React, { Component } from 'react';
import { Auth as AmplifyAuth } from 'aws-amplify';
import { navigate } from '@reach/router';
import { mapQueryParams, AUTHENTICATION_ERROR_MESSAGES } from '../core';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      code: '',
      password: '',
      alert: null,
    };
  }

  componentDidMount() {
    const { username } = mapQueryParams(window.location.search);
    if (username) this.setState({ username });
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
      const { username, code, password } = this.state;
      await AmplifyAuth.forgotPasswordSubmit(username, code, password);
      navigate('/signin');
    } catch (error) {
      const message = AUTHENTICATION_ERROR_MESSAGES[error.code] || error.message;
      this.alert(message, 'red');
    }
  }

  render() {
    return (
      <>
        <h3>Reset Password</h3>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div>
          <label htmlFor="code">Verification Code:</label>
          <input id="code" type="text" name="code" value={this.state.code} onChange={this.handleChange.bind(this)} />
        </div>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        {this.state.alert && <div style={{ color: this.state.alert.color }}>{this.state.alert.message}</div>}
      </>
    );
  }
}

export default ResetPassword;
