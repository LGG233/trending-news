import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { ApiService } from '../services';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  TOKEN_URL,
  AUTH_TOKEN,
  AWS_COGNITO_LOGIN_REDIRECT_URL,
  mapJsonToUrlEncoded,
  mapQueryParams,
} from '../core';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  async componentDidMount() {
    // check for AWS authorization code in URL
    const queryParams = mapQueryParams(this.props.location.search);
    if (!queryParams.code) return this.setState({ error: 'code missing' });

    try {
      // request temporary access token
      const authData = mapJsonToUrlEncoded({
        grant_type: 'authorization_code',
        redirect_uri: `${AWS_COGNITO_LOGIN_REDIRECT_URL}`,
        code: queryParams.code,
      });
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: `Basic ${AUTH_TOKEN}`,
      };
      const tokenResponse = await ApiService.post(TOKEN_URL, authData, { headers });

      // store token in client browser
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokenResponse.data.access_token);

      // get user data
      headers = { Authorization: `Bearer ${tokenResponse.data.access_token}` };
      const userAwsResponse = await ApiService.get('user-aws', { headers });

      // update state and go to home page
      this.setState({ isLoaded: true });
      this.props.updateUser({
        loggedIn: true,
        username: userAwsResponse.data.username,
      });
      navigate('/');
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) return <h1>Login failure: {error}</h1>;
    if (!isLoaded) return <h1>Loading...</h1>;
    return <h1>Login successful!</h1>;
  }
}

export default Auth;
