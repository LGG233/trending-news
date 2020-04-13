import React, { Component } from 'react';

class MyTopics extends Component {
  render() {
    return (
      <div>
        <h3>My Topics</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Search Terms</th>
              <th>
                <button
                  className="btn btn-sm btn-secondary card-btn"
                  onClick={() => this.editTopics(this.state.userId)}
                >
                  Edit Topics
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.topics.map((topics) => (
              <tr>
                <th scope="row">{topics.name}</th>
                <td>{topics.searchTerm}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary card-btn"
                    onClick={() => this.deleteTopic(this.state.userId)}
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

export default MyTopics;
