import React, { Component } from 'react';
import { Redirect } from '@reach/router';
import { MyInfo, MyPublications, MyTopics, MyArticles } from './index';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
    };
  }

  render() {
    const { name, username, email, publications, topics, savedArticles } = this.props.user;
    if (this.state.redirectTo) {
      return <Redirect to="/" noThrow />;
    } else {
      return (
        <div>
          <h1>User Profile for {username}</h1>
          <MyInfo name={name} username={username} email={email} />
          <br></br>
          <MyPublications publications={publications} />
          <br></br>
          <MyTopics topics={topics} />
          <br></br>
          <MyArticles savedArticles={savedArticles} />
        </div>
      );
    }
  }
}

export default UserProfile;
