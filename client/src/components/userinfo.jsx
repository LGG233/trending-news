import React, { Component } from 'react';
import { ApiService } from '../services';

class MyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            userId: "",
            data: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let username = localStorage.getItem("username");
        ApiService.get(`user/data/${username}`)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    name: res.data.name,
                    email: res.data.email,
                });
            })
    };

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
                            <th scope="row">{this.state.name}</th>
                            <td>{this.state.username}</td>
                            <td>{this.state.email}</td>
                            <td><button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editUserInfo(this.state.userId)}>Edit User Info</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MyInfo;

