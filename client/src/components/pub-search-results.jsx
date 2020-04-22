import React, { Component } from 'react';
// import { Redirect } from '@reach/router';
import { ApiService } from '../services';
import { Link } from '@reach/router';

class PubSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { name: '', twitterHandle: '' },
      redirectTo: false,
      loaded: false,
    };
  }

  render() {
    console.log('this.props: ', this.props);
    console.log('this.state: ', this.state);
    console.log('state.name: ', this.state.name);
    console.log('props nane: ', this.props.name);
    return (
      <div>
        <Link to="/pub-entry" className="btn btn-link text-secondary">
          <span className="text-secondary">new publication</span>
        </Link>
        <Link to="/pub-search" className="btn btn-link text-secondary">
          <span className="text-secondary">search publications</span>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Publication</th>
              <th scope="col">Twitter Handle</th>
              <th scope="col">{'  '}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{this.state.name}</th>
              <th scope="row">{this.props.twitterHandle}</th>
              <input
                className="form-check-input"
                type="checkbox"
                name="addToMyPubs"
                id="addToMyPubs"
                value="option1"
                unchecked
              ></input>
              <label className="form-check-label" for="addToMyPubs">
                Add to My Pubs
              </label>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PubSearchResults;
