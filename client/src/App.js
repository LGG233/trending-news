import React, { Component } from 'react';
import { Router } from '@reach/router';
import { NavBar, SignUp, SignIn, Landing, UserProfile, Auth } from './components';
import { ApiService } from './services';
import { ACCESS_TOKEN_STORAGE_KEY } from './core';
import PubDisplay from './components/pub-display';
import PubEntry from './components/pub-entry';
import PubSearch from './components/pub-search';
import PubSearchResults from './components/pub-search-results'


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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
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

  render() {
    return (
      <>
        <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if loggen in: */}
        {this.state.loggedIn && <p>Join the party, {this.state.user.username}!</p>}
        <br />
        <div className="container-fluid MainPage">
          <div className="row">
            <div className="col-md-12">
              <Router>
                <Landing path="/" />
                <SignUp path="/signup" signup={this.signup} />
                <SignIn path="/signin" updateUser={this.updateUser} />
                <UserProfile path="/userProfile" user={this.state.user} />
                <Auth path="/auth" updateUser={this.updateUser} />
                <PubEntry path="/pub-entry" />
                <PubDisplay path="pub-display" />
                <PubSearch path="/pub-search" />
                <PubSearchResults path="/pub-search-results" />
              </Router>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
