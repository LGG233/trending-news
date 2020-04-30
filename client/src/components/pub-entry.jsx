import React, { Component } from 'react';
import { Redirect, navigate } from '@reach/router';
import { ApiService } from '../services';

class PubEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      twitterHandle: '',
      entryTitle: '',
      entryTwitterHandle: '@',
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
    if (this.state.entryTitle.length === 0 || this.state.entryTwitterHandle.length <= 1) {
      alert('Please enter a valid name and Twitter handle for the publication');
      navigate('/pub-entry');
    } else {
      ApiService.post('pubs', {
        name: this.state.entryTitle,
        twitterHandle: this.state.entryTwitterHandle,
      })
        .then((response) => {
          if (response.statusText === 'OK') {
            navigate('/pub-display');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    navigate('/pub-display');
  };

  render() {
    return (
      <div>
        <h4>New Publication</h4>
        <div className="container-fluid">
          <div className="container">
            <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormField">
                <div className="FormField">
                  <label for="entryTitle">Publication Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="entryTitle"
                    placeholder="Enter name of publication"
                    name="entryTitle"
                    value={this.state.entryTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label for="entryTwitterHandle">Twitter Handle</label>
                  <input
                    type="text"
                    className="form-control"
                    id="entryTwitterHandle"
                    placeholder="Enter Twitter Handle"
                    name="entryTwitterHandle"
                    value={this.state.entryTwitterHandle}
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

export default PubEntry;
