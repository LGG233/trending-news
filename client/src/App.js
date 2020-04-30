import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Auth as AmplifyAuth } from 'aws-amplify';
import {
  NavBar,
  SignUp,
  SignIn,
  Landing,
  UserProfile,
  Auth,
  PubEntry,
  PubDisplay,
  PubSearch,
  Confirm,
} from './components';
import { ApiService } from './services';
import { ACCESS_TOKEN_STORAGE_KEY } from './core';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {
        name: '',
        username: '',
        email: '',
        publications: [],
        topics: [],
        savedArticles: [],
      },
    };
    this.getUser = this.getUser.bind(this);
    this.getUserV2 = this.getUserV2.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    this.getUserV2();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  async getUser() {
    // retrieve access token from local storage
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (!token) return;

    // get user data
    const headers = { Authorization: `Bearer ${token}` };
    const userResponse = await ApiService.get('user', { headers }).catch(() => null);

    // remain "logged out" on user data fetch error
    if (!userResponse) return;

    // user is logged in!
    const { name, username, email, publications, topics, savedArticles } = userResponse.data;
    this.setState({
      loggedIn: true,
      user: {
        name,
        username,
        email,
        publications,
        topics,
        savedArticles,
      },
    });
  }

  async getUserV2(userFromSignIn) {
    // verify authenticated user
    const user = userFromSignIn || (await AmplifyAuth.currentAuthenticatedUser().catch(() => null));
    // remain "logged out" if no authenticated user data found in browser
    if (!user) return;

    // get user data
    const userResponse = await ApiService.get('user/v2').catch(() => null);
    // remain "logged out" on user data fetch error
    if (!userResponse) return;

    // user is logged in!
    const { name, username, email, publications, topics, savedArticles } = userResponse.data;
    this.setState({
      loggedIn: true,
      user: {
        name,
        username,
        email,
        publications,
        topics,
        savedArticles,
      },
    });
  }

  render() {
    return (
      <>
        <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn && (
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-6">
              <h3>Welcome, {this.state.user.username}!</h3>
            </div>
          </div>
        )}
        <br />
        <div className="container-fluid MainPage">
          <div className="row">
            <div className="col-md-12">
              <Router>
                <Landing path="/" />
                <SignUp path="/signup" signup={this.signup} />
                <SignIn path="/signin" updateUser={this.updateUser} getUser={this.getUserV2} />
                <Confirm path="/confirm" />
                <UserProfile path="/userProfile" user={this.state.user} />
                <Auth path="/auth" updateUser={this.updateUser} />
                <PubEntry path="/pub-entry" />
                <PubDisplay path="pub-display" />
                <PubSearch path="/pub-search" />
              </Router>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
