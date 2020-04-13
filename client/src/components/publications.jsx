import React, { Component } from 'react';

class MyPublications extends Component {
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
                <button
                  className="btn btn-sm btn-secondary card-btn"
                  onClick={() => this.editPublications(this.state.userId)}
                >
                  Edit Publications
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.publications.map((pubs) => (
              <tr>
                <th scope="row">{pubs.name}</th>
                <td>{pubs.twitterHandle}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary card-btn"
                    onClick={() => this.deletePubs(this.state.userId)}
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
