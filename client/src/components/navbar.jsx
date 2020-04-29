import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import { Auth as AmplifyAuth } from 'aws-amplify';

class NavBar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout = async () => {
    try {
      await AmplifyAuth.signOut();
      this.props.updateUser({
        loggedIn: false,
        user: {
          name: '',
          username: '',
          email: '',
          publications: [],
          topics: [],
          savedArticles: [],
        },
      });
      navigate('/');
    } catch (error) {
      console.log('error signing out', error);
    }
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
                <Link to="/userProfile" className="btn btn-link text-secondary">
                  <span className="text-secondary">profile</span>
                </Link>
                <Link to="/pub-display" className="btn btn-link text-secondary">
                  <span className="text-secondary">publications</span>
                </Link>
                <button className="btn btn-link text-secondary" onClick={this.logout}>
                  <span className="text-secondary">logout</span>
                </button>
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
