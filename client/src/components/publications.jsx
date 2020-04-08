import React, { Component } from 'react';
import { ApiService } from '../services';

class MyPublications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publications: [],
            data: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let username = localStorage.getItem("username");
        ApiService.get(`user/data/${username}`)
            .then(res => {
                this.setState({
                    publications: res.data.publications,
                });
            })
    };

    render() {
        return (
            <div>
                <h3>My Publications</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Twitter Handle</th>
                            <th><button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editPublications(this.state.userId)}>Edit Publications</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.publications.map(pubs => (
                            <tr>
                                <th scope="row">{pubs.name}</th>
                                <td>{pubs.twitterHandle}</td>
                                <td><button className="btn btn-sm btn-secondary card-btn" onClick={() => this.deletePubs(this.state.userId)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MyPublications;

