import React, { Component } from 'react';
import { ApiService } from '../services';

class MyTopics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            data: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let username = localStorage.getItem("username");
        ApiService.get(`user/data/${username}`)
            .then(res => {
                this.setState({
                    topics: res.data.topics,
                });
            })
    };

    render() {
        return (
            <div>
                <h3>My Topics</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Search Terms</th>
                            <th><button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editTopics(this.state.userId)}>Edit Topics</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.topics.map(topics => (
                            <tr>
                                <th scope="row">{topics.name}</th>
                                <td>{topics.searchTerm}</td>
                                <td><button className="btn btn-sm btn-secondary card-btn" onClick={() => this.deleteTopic(this.state.userId)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MyTopics;

