import React, { Component } from 'react';
import { Redirect, navigate, Link } from '@reach/router';
import { Auth as AmplifyAuth } from 'aws-amplify';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectTo: null,
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
      const user = await AmplifyAuth.signIn(this.state.username, this.state.password);
      this.props.getUser(user);
      navigate('/');
    } catch (error) {
      console.log(error.code);
      if (error.code === 'UserNotConfirmedException') {
        navigate(`/confirm?username=${this.state.username}`);
      }
      console.log('error signing in', error);
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    } else {
      return (
        <div>
          <h1>Sign In</h1>
          <br></br>
          <br></br>
          <div className="container-fluid">
            <div className="row">
              <div className="FormField">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="Enter Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={this.state.password}
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
            <div className="row">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SignIn;
