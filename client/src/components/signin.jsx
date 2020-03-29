import React, { Component } from 'react';
import axios from 'axios'
// import { response } from 'express';
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleChange = event => {
        let target = event.target;
        let name = target.name;
        this.setState({
            [name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault()
        console.log('sign-in form fired')

        axios
            .post('/user/signin', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                console.log(response.status)
                console.log(response.data.username)
                localStorage.setItem("username", this.state.username);
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update status to redirect to logged-in-home
                    window.location.replace('/')
                    // this.setState({
                    //     redirectTo: '/'
                    // })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
            })
    }

    handleCancel = event => {
        event.preventDefault()
        window.location.replace("/")
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h1>Sign In</h1>
                    <br></br>
                    <br></br>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="FormField">
                                <label for="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    placeholder="Enter Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <button
                                className="btn btn-sm btn-secondary entrySubmit"
                                onClick={this.handleSubmit}
                            >
                                Submit{" "}
                            </button>
                            <button
                                className="btn btn-sm btn-secondary entryCancel"
                                onClick={this.handleCancel}
                            >
                                Cancel{" "}
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SignIn;
