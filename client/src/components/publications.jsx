import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { ApiService } from '../services';

class MyPublications extends Component {
  editPublications() {
    navigate('/pub-display');
  }

  deletePubs(value) {
    let publication = value;
    ApiService.delete('pubs', {
      name: publication.name,
      twitterHandle: publication.twitterHandle,
    })
      .then((response) => {
        if (response.statusText === 'OK') {
          this.props.getUser();
          navigate('/userProfile');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>My Publications</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Twitter Handle</th>
              <th>
                <button className="btn btn-link text-secondary" onClick={() => this.editPublications()}>
                  Add New Publications
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.publications.map((pubs, index) => (
              <tr key={pubs._id}>
                <th scope="row">{pubs.name}</th>
                <td>{pubs.twitterHandle}</td>
                <td>
                  <button
                    className="btn btn-link text-secondary"
                    value={pubs}
                    onClick={this.deletePubs.bind(this, pubs)}
                  >
                    Delete
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

export default MyPublications;
