import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { ApiService } from '../services';

class TopicEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      entryTerm: '',
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

  handleSubmit = (event) => {
    event.preventDefault();
    ApiService.post('topics', {
      entryTerm: this.state.entryTerm,
    })
      .then((response) => {
        if (response.statusText === 'OK') {
          window.location.replace('/userProfile');
        }
        // navigate('/userProfile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCancel = (event) => {
    event.preventDefault();
    navigate('/userProfile');
  };

  render() {
    return (
      <div>
        <h4>New Topic</h4>
        <div className="container-fluid">
          <div className="container">
            <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormField">
                <div className="FormField">
                  <label for="entryTerm">Search Term</label>
                  <input
                    type="text"
                    className="form-control"
                    id="entryTerm"
                    placeholder="Enter search term"
                    name="entryTerm"
                    value={this.state.entryTerm}
                    onChange={this.handleChange}
                  />
                </div>
                <br></br>
                <button className="btn btn-sm btn-secondary entrySubmit" onClick={this.handleSubmit}>
                  Submit{' '}
                </button>
                <button className="btn btn-sm btn-secondary entryCancel" onClick={this.handleCancel}>
                  Cancel{' '}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopicEntry;
