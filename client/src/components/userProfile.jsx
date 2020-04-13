import React, { Component } from 'react';
import { Redirect } from '@reach/router';
// import { MyInfo, MyPublications, MyTopics, MyArticles } from './components';
import MyInfo from './userinfo';
import MyPublications from './publications';
import MyTopics from './topics';
import MyArticles from './articles';
import { ApiService } from '../services';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        name: '',
        email: '',
        userId: '',
        publications: [],
        topics: [],
        savedArticles: [],
      },
      redirectTo: null,
    };
  }

  componentDidMount() {
    let username = localStorage.getItem('username');
    ApiService.get(`user/data/${username}`).then((res) => {
      this.setState({
        data: res.data,
      });
    });
    // (error) => {
    //   console.log('Your request to load the User Profile failed because: ', error);
    // };
  }

  render() {
    const { name, username, email, publications, topics, savedArticles } = this.state.data;
    // if (this.state.redirectTo) {
    //   return <Redirect to={this.state.redirectTo} />;
    // } else {
    return (
      <div>
        <h1>User Profile for {localStorage.getItem('username')}</h1>
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
// }

export default UserProfile;
