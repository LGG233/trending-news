import React, { Component } from 'react';
import { navigate } from '@reach/router';

class MyPublications extends Component {
  editPublications() {
    navigate('/pub-display');
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
                  Edit My Pubs
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.publications.map((pubs, index) => (
              <tr key={index}>
                <th scope="row">{pubs.name}</th>
                <td>{pubs.twitterHandle}</td>
                <td>
                  <button className="btn btn-link text-secondary" onClick={() => this.deletePubs(this.state.userId)}>
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
