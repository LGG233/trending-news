import React, { Component } from 'react';
import { Link } from '@reach/router';
import { ApiService } from '../services';

class ForgotUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
      const response = await ApiService.get('username', { params: { email: this.state.email } });
      this.alert(`Username: ${response.data.username}`, 'green');
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data : 'Error';
      this.alert(message, 'red');
    }
  }

  render() {
    return (
      <>
        <h3>Forgot Username</h3>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        <Link to="/forgot-password">Forgot Password?</Link>
        {this.state.alert && <div style={{ color: this.state.alert.color }}>{this.state.alert.message}</div>}
      </>
    );
  }
}

export default ForgotUsername;
