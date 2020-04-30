import React, { Component } from 'react';
import { ApiService } from '../services';
import { navigate, Link } from '@reach/router';

class PubSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      twitterHandle: '',
      searchTitle: '',
      searchTwitterHandle: '',
      data: [],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleChange = (event) => {
    let target = event.target;
    let name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCancel = (event) => {
    event.preventDefault();
    navigate('/pub-display');
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let query = '';
    let pubName = this.state.searchTitle;
    let pubTwitter = this.state.searchTwitterHandle;
    if (pubName.length > 0) {
      query = 'pubs/searchPubTitle/' + pubName;
    } else {
      query = 'pubs/searchPubTwitter/' + pubTwitter;
    }
    if (this.state.searchTitle.length === 0 && this.state.searchTwitterHandle.length === 0) {
      alert('Please enter either a publication title or a Twitter handle to run the search');
      navigate('/pub-search');
    } else {
      ApiService.get(query)
        .then((response) => {
          if (response.data === null) {
            alert('No publication with that name found. Please enter it into the database.');
            navigate('/pub-entry');
          } else {
            this.setState({
              data: response.data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleNewSearch = (event) => {
    this.setState({
      name: '',
      twitterHandle: '',
      searchTitle: '',
      searchTwitterHandle: '',
      data: [],
    });
  };

  addMyPubs = (event) => {
    event.preventDefault();
  };

  render() {
    if (this.state.data.length === 0) {
      return (
        <div>
          <Link to="/pub-entry" className="btn btn-link text-secondary">
            <span className="text-secondary">new publication</span>
          </Link>
          <h4>Search for Publication (by title or Twitter handle)</h4>
          <div className="container-fluid">
            <div className="container">
              <div className="FormCenter">
                <form className="FormField">
                  <div className="FormField">
                    <label for="searchTitle">Publication Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="searchTitle"
                      placeholder="Enter name of publication"
                      name="searchTitle"
                      value={this.state.searchTitle}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="searchTwitterHandle">Twitter Handle</label>
                    <input
                      type="text"
                      className="form-control"
                      id="searchTwitterHandle"
                      placeholder="Enter Twitter Handle"
                      name="searchTwitterHandle"
                      value={this.state.searchTwitterHandle}
                      onChange={this.handleChange}
                    />
                  </div>
                  <br></br>
                  <button className="btn btn-sm btn-secondary searchSubmit" onClick={this.handleSubmit}>
                    Submit{' '}
                  </button>
                  <button className="btn btn-sm btn-secondary searchCancel" onClick={this.handleCancel}>
                    Cancel{' '}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/pub-entry" className="btn btn-link text-secondary">
            <span className="text-secondary">new publication</span>
          </Link>
          <button className="btn btn-link text-secondary" onClick={() => this.handleNewSearch()}>
            <span className="text-secondary">new search</span>
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Publication</th>
                <th scope="col">Twitter Handle</th>
                <th scope="col">{'  '}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((results) => (
                <tr>
                  <th scope="row">{results.name}</th>
                  <td>{results.twitterHandle}</td>
                  <td>
                    <button className="btn btn-sm btn secondary add-mypubs" onClick={() => this.addMyPubs()}>
                      Add to My Pubs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default PubSearch;
