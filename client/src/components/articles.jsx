import React, { Component } from 'react';

class MyArticles extends Component {
  render() {
    return (
      <div>
        <h3>My Articles</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Tags</th>
              <th>
                <button
                  className="btn btn-sm btn-secondary card-btn"
                  onClick={() => this.editArticles(this.state.userId)}
                >
                  Edit Articles
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.savedArticles.map((articles) => (
              <tr>
                <th scope="row">
                  <a href={articles.link}>{articles.title}</a>
                </th>
                <td>{articles.tags}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary card-btn"
                    onClick={() => this.deleteArticles(this.state.userId)}
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

export default MyArticles;
