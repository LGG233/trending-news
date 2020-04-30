import React, { Component } from 'react';
import { Link } from '@reach/router';

class PubShowData extends Component {
  render() {
    // const isLoaded = this.props.loaded;
    // console.log('Loaded?: ', this.props.loaded);
    // if (!isLoaded) {
    //   return (
    //     <div>
    //       <h4>Loading...</h4>
    //     </div>
    //   );
    // } else {
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
            {this.state.props.map((pubs) => (
              <tr>
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

export default PubShowData;
