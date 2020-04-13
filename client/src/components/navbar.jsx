import React, { Component } from 'react';
import { Link } from '@reach/router';
import { ApiService } from '../services';
import { LOGOUT_URL, ACCESS_TOKEN_STORAGE_KEY } from '../core';

class NavBar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout = (event) => {
    event.preventDefault();
    ApiService.post('user/logout')
      .then((response) => {
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch((error) => {
        console.log('Logout error');
      });
  };

  logoutAws = () => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  };

  render() {
    const loggedIn = this.props.loggedIn;

    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4">
            <h1>Trending Topics</h1>
            {loggedIn ? (
              <section className="navbar-section">
                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                  <span className="text-secondary">logout</span>
                </Link>
                <Link to="/userProfile" className="btn btn-link text-secondary">
                  <span className="text-secondary">profile</span>
                </Link>
                <a href={LOGOUT_URL} className="btn btn-link text-secondary" onClick={this.logoutAws}>
                  <span className="text-secondary">Logout AWS</span>
                </a>
              </section>
            ) : (
              <section className="navbar-section">
                <Link to="/" className="btn btn-link text-secondary">
                  <span className="text-secondary">home</span>
                </Link>
                <Link to="/signin" className="btn btn-link text-secondary">
                  <span className="test-secondary">sign in</span>
                </Link>
                <Link to="/signup" className="btn btn-link text-secondary">
                  <span className="text-secondary">sign up</span>
                </Link>
              </section>
            )}
          </div>
        </header>
      </div>
    );
  }
}
// const NavBar = props => {
//     return (
//         <nav className="navbar navbar-light bg-light">
//             <a className="navbar-brand" href='/'>
//                 <h3>Legal Trending Topics{" "}</h3>
//             </a>
//         </nav>);
// }

export default NavBar;
