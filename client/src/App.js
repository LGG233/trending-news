import React, { Component } from 'react';
import axios from 'axios';
import { Router } from '@reach/router';

import { NavBar, SignUp, SignIn, Landing } from './components';
import UserProfile from './components/userProfile';
import { ApiService } from './services';

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
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    ApiService.get('user/').then((response) => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: there is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
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
              </Router>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
