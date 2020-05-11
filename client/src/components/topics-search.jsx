import React, { Component } from 'react';
import { ApiService } from '../services';
import { navigate, Link } from '@reach/router';
import { Dropdown, DropdownButton } from 'react-bootstrap';

class TopicSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      searchTerm: '',
      searchParameter: '',
      dropDownValue: 'Topic',
      searchComplete: false,
      data: [],
    };
  }

  async componentDidMount() {
    await ApiService.get('topics').then(
      (res) => {
        this.setState({
          data: res.data,
          loaded: true,
        });
      },
      (error) => {
        console.log('Your request to load topics list has failed because: ', error);
        this.setState({ redirectTo: true });
      }
    );
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
    navigate('/topics-display');
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let parameter = this.state.searchParameter;
    let topic = this.state.dropDownValue;
    let query = 'topics/searchTopics/' + topic + '/' + parameter;
    console.log(query);
    if (parameter.length === 0) {
      alert('Please enter a search term');
      navigate('/topics-search');
    } else {
      ApiService.get(query)
        .then((response) => {
          if (response.data === null) {
            alert('Nothing found. Please enter it into the database.');
            navigate('/topics-entry');
          } else {
            this.setState({
              data: response.data,
              searchComplete: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleNewSearch = (event) => {
    ApiService.get('topics').then((res) => {
      this.setState({
        data: res.data,
        searchComplete: false,
      });
    });
  };

  changeValue = (event) => {
    this.setState({ dropDownValue: event.currentTarget.textContent });
    console.log(this.state.dropDownValue);
  };

  addMyTopics = (event) => {
    event.preventDefault();
  };

  addMySearchTerms = (event) => {
    event.preventDefault();
  };

  render() {
    if (!this.state.searchComplete) {
      return (
        <div>
          <h4>Search Topics</h4>
          <div className="container-fluid">
            <DropdownButton id="dropdown-item-button" title={this.state.dropDownValue}>
              {this.state.data.map((topic, index) => (
                <Dropdown.Item key={index}>
                  <div onClick={this.changeValue}>{topic.name}</div>
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <div className="container">
              <div className="FormCenter">
                <form className="FormField">
                  <div className="FormField">
                    <label for="searchParameter">Search Term</label>
                    <input
                      type="text"
                      className="form-control"
                      id="searchParameter"
                      placeholder="Enter search term"
                      name="searchParameter"
                      value={this.state.searchParameter}
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
          <Link to="/topics-entry" className="btn btn-link text-secondary">
            <span className="text-secondary">new topic</span>
          </Link>
          <button className="btn btn-link text-secondary" onClick={() => this.handleNewSearch()}>
            <span className="text-secondary">new search</span>
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Search Terms</th>
                <th scope="col">{'  '}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((topics) => (
                <tr key={topics._id}>
                  <th scope="row">{topics.name}</th>
                  {/* <td>{topics.searchTerm}</td> */}
                  <td>
                    <ul>
                      {topics.searchTerm.map((terms) => (
                        <li>
                          {terms}
                          <button className="btn btn-sm btn secondary add-mypubs" onClick={() => this.addMyTopics()}>
                            <small>(add to My Topics)</small>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button className="btn btn-sm btn secondary add-mypubs" onClick={() => this.addMyTopics()}>
                      Add <b>{topics.name}</b> to My Topics
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

export default TopicSearch;
