import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Components
import NavBar from './components/navbar';
import SignUp from './components/signup';
import SignIn from './components/signin';
// import Home from './components/home';
import Landing from './components/landing';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: there is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if loggen in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>}
        <br />
        <div className="container-fluid MainPage">
          <div className="row">
            <div className="col-md-12">
              <Switch>
                <Route
                  exact path="/"
                  component={Landing} />
                {/* <Route exact path="/home" component={Home} /> */}
                <Route
                  path="/signup"
                  render={() =>
                    <SignUp
                      signup={this.signup}
                    />}
                />
                <Route
                  path="/signin"
                  render={() =>
                    <SignIn
                      updateUser={this.updateUser}
                    />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
