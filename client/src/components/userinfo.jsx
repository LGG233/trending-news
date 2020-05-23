import React, { Component } from 'react';

class MyInfo extends Component {
  render() {
    return (
      <div>
        <h3>My Info</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{this.props.name}</th>
              <td>{this.props.username}</td>
              <td>{this.props.email}</td>
              <td>
                <button className="btn btn-link text-secondary" onClick={() => this.editUserInfo(this.state.userId)}>
                  Edit User Info
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyInfo;
