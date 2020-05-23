import React, { Component } from 'react';
import { Redirect } from '@reach/router';
import { MyInfo, MyPublications, MyTopics } from './index';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
    };
  }

  render() {
    const { name, username, email, publications, topics } = this.props.user;
    if (this.state.redirectTo) {
      return <Redirect to="/" noThrow />;
    } else {
      return (
        <div>
          <h2>{username}'s Profile</h2>
          <MyInfo name={name} username={username} email={email} />
          <br></br>
          <MyPublications publications={publications} />
          <br></br>
          <MyTopics topics={topics} getUser={this.props.getUser} />
        </div>
      );
    }
  }
}

export default UserProfile;
