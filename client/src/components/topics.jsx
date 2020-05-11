import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { ApiService } from '../services';

class MyTopics extends Component {
  deleteTopic(value) {
    let searchTerm = value.topics;
    ApiService.post('topics/' + searchTerm)
      .then((response) => {
        navigate('/userProfile');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>
          My Topics
          <button
            className="btn btn-link text-secondary"
            onClick={function () {
              navigate('./topics-entry');
            }}
          >
            Add New
          </button>
        </h3>

        <table className="table-sm">
          <tbody>
            {this.props.topics.map((topics, index) => (
              <tr key={index}>
                <th scope="row">
                  {topics}
                  <button className="btn btn-link text-secondary" onClick={() => this.deleteTopic({ topics })}>
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyTopics;
