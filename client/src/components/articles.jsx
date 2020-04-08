import React, { Component } from 'react';
import { ApiService } from '../services';

class MyArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedArticles: [],
            data: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let username = localStorage.getItem("username");
        ApiService.get(`user/data/${username}`)
            .then(res => {
                this.setState({
                    savedArticles: res.data.savedArticles,
                });
            })
    };

    render() {
        return (
            <div>
                <h3>My Articles</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Link</th>
                            <th><button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editArticles(this.state.userId)}>Edit Articles</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.savedArticles.map(articles => (
                            <tr>
                                <th scope="row">{articles.title}</th>
                                <td>{articles.link}</td>
                                <td><button className="btn btn-sm btn-secondary card-btn" onClick={() => this.deleteArticles(this.state.userId)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MyArticles;

