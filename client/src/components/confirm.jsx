import React, { Component } from 'react';
import { Auth as AmplifyAuth } from 'aws-amplify';
import { mapQueryParams } from '../core';
import { navigate } from '@reach/router';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      alert: null,
    };
  }

  alert(message, color) {
    this.setState({ alert: { message, color } });
  }

  handleChange(event) {
    const { name, value } = event.target;
    console.log('name, value', name, value);
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const { username } = mapQueryParams(this.props.location.search);
    const { code } = this.state;
    try {
      this.alert('verification in progress...', 'gray');
      await AmplifyAuth.confirmSignUp(username, code);
      navigate('/signin');
    } catch (error) {
      this.alert(error.message, 'red');
    }
  }

  async requestNewCode() {
    const { username } = mapQueryParams(this.props.location.search);
    try {
      this.alert('sending new code...', 'gray');
      await AmplifyAuth.resendSignUp(username);
      this.alert('Sent!', 'green');
    } catch (error) {
      this.alert(error.message, 'red');
    }
  }

  render() {
    return (
      <>
        <h3>Please confirm your email address.</h3>
        <label htmlFor="code">Enter Verification Code:</label>
        <input id="code" type="text" name="code" value={this.state.code} onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        <button onClick={this.requestNewCode.bind(this)}>Request new code</button>
        {this.state.alert && <div style={{ color: this.state.alert.color }}>{this.state.alert.message}</div>}
      </>
    );
  }
}

export default Confirm;
