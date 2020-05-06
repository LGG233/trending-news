import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { Auth as AmplifyAuth } from 'aws-amplify';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleChange = (event) => {
    let target = event.target;
    let name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = async () => {
    try {
      const { username, password, email } = this.state;
      await AmplifyAuth.signUp({ username, password, attributes: { email } });
      navigate(`/confirm?username=${username}`);
    } catch (error) {
      console.log('error signing up', error);
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  render() {
    return (
      <div>
        <h1>Sign Up Form</h1>
        <br></br>
        <br></br>
        <div className="container-fluid">
          <div className="row">
            <div className="FormField">
              <label for="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Your Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="FormField">
              <label for="username">ID</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Create Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Create Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="FormField">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <button className="btn btn-sm btn-secondary entrySubmit" onClick={this.handleSubmit}>
              Submit{' '}
            </button>
            <button className="btn btn-sm btn-secondary entryCancel" onClick={this.handleCancel}>
              Cancel{' '}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
