import React, { Component } from 'react';
import { Router } from '@reach/router';
import { NavBar, SignUp, SignIn, Landing, UserProfile, Auth } from './components';
import { ApiService } from './services';
import { ACCESS_TOKEN_STORAGE_KEY } from './core';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getAwsUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    ApiService.get('user/').then((response) => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
  }

  async getAwsUser() {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (!token) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const userAwsResponse = await ApiService.get('user-aws', { headers });
      this.setState({ loggedIn: true, username: userAwsResponse.data.username });
    } catch (error) {}
  }

  render() {
    return (
      <>
        <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if loggen in: */}
        {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}
        <br />
        <div className="container-fluid MainPage">
          <div className="row">
            <div className="col-md-12">
              <Router>
                <Landing path="/" />
                <SignUp path="/signup" signup={this.signup} />
                <SignIn path="/signin" updateUser={this.updateUser} />
                <UserProfile path="/userProfile" />
                <Auth path="/auth" updateUser={this.updateUser} />
              </Router>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
