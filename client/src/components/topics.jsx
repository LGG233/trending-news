import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { ApiService } from '../services';

class MyTopics extends Component {
  deleteTopic(value) {
    let searchTerm = value.topic;
    ApiService.delete('topics/' + searchTerm)
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
        <h3>
          My Topics
          <button
            className="btn btn-link text-secondary"
            onClick={function () {
              navigate('/topics-entry');
            }}
          >
            Add New
          </button>
        </h3>

        <table className="table-sm">
          <tbody>
            {this.props.topics.map((topic, index) => (
              <tr key={index}>
                <th scope="row">
                  {topic}
                  <button className="btn btn-link text-secondary" onClick={() => this.deleteTopic({ topic })}>
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
