import React, { Component } from 'react';
import { ApiService } from '../services';
import { Link } from '@reach/router';

class PubDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: '',
        name: '',
        twitterHandle: '',
        redirectTo: false,
        loaded: false,
      },
    };
  }

  async componentDidMount() {
    await ApiService.get('pubs').then(
      (res) => {
        this.setState({
          data: res.data,
          loaded: true,
        });
      },
      (error) => {
        console.log('Your request to load publications list has failed because: ', error);
        this.setState({ redirectTo: true });
      }
    );
  }

  render() {
    const isLoaded = this.state.loaded;
    if (!isLoaded) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else {
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
              {this.state.data.map((pubs) => (
                <tr key={pubs._id}>
                  <th scope="row">{pubs.name}</th>
                  <td>{pubs.twitterHandle}</td>
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

export default PubDisplay;
