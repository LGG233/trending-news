import React, { Component } from 'react';
import { Redirect, navigate } from '@reach/router';
import MyInfo from './userinfo';
import MyPublications from './publications';
import MyTopics from './topics';
import MyArticles from './articles';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      email: '',
      userId: '',
      dummyData: '',
      publications: [],
      topics: [],
      savedArticles: [],
      data: [],
      redirectTo: null,
    };
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    } else {
      return (
        <div>
          <h1>User Profile for {localStorage.getItem('username')}</h1>
          <MyInfo />
          <br></br>
          <MyPublications />
          <br></br>
          <MyTopics />
          <br></br>
          <MyArticles />
        </div>
      );
    }
  }
}

export default UserProfile;
