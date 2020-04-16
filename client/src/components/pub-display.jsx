import React, { Component } from 'react';
// import { Redirect } from '@reach/router';
import { ApiService } from '../services';

class PubDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      twitterHandle: '',
      redirectTo: false,
    };
  }

  componentDidMount() {
    console.log('db query launched');
    ApiService.get('pubs/data').then(
      (res) => {
        this.setState({
          data: res.data,
        });
      },
      (error) => {
        console.log('Your request to load publications list has failed because: ', error);
        this.setState({ redirectTo: true });
      }
    );
  }

  render() {
    console.log('here is the data :', this.state);
    return (
      <div>
        <h4>Publications List</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Publication</th>
              <th scope="col">Twitter Handle</th>
            </tr>
          </thead>
          {/* <tbody>
            {this.state.data.map((pubs) => (
              <tr>
                <th scope="row">{pubs.title}</th>
                <th scope="row">{pubs.twitterHandle}</th>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    );
  }
}

export default PubDisplay;
