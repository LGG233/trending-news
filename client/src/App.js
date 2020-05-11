import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Auth as AmplifyAuth } from 'aws-amplify';
import {
  NavBar,
  SignUp,
  SignIn,
  Landing,
  UserProfile,
  PubEntry,
  PubDisplay,
  PubSearch,
  Confirm,
  ForgotUsername,
  ForgotPassword,
  ResetPassword,
  TopicSearch, TopicEntry
} from './components';
import { ApiService } from './services';

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

  async componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  async getUser(userFromSignIn) {
    // verify authenticated user
    const user = userFromSignIn || (await AmplifyAuth.currentAuthenticatedUser().catch(() => null));
    // remain "logged out" if no authenticated user data found in browser
    if (!user) return;

    // get user data
    const userResponse = await ApiService.get('user').catch(() => null);
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
                <SignIn path="/signin" updateUser={this.updateUser} getUser={this.getUser} />
                <Confirm path="/confirm" />
                <ForgotUsername path="/forgot-username" />
                <ForgotPassword path="/forgot-password" />
                <ResetPassword path="/reset-password" />
                <UserProfile path="/userProfile" user={this.state.user} />
                <PubEntry path="/pub-entry" />
                <PubDisplay path="pub-display" />
                <PubSearch path="/pub-search" />
                <TopicSearch path="/topics-search" />
                <TopicEntry path="/topics-entry" />
              </Router>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
