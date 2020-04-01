import React, { Component } from 'react';
import axios from 'axios'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            email: ""
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
        console.log('sign-up form fired')
        console.log('Name: ', this.state.name)
        console.log('Username: ', this.state.username)
        console.log('Password: ', this.state.password)
        console.log('Email: ', this.state.email)
        axios.post('/user/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log('successful signup')
                    // window.location.replace('/signin')
                    this.setState({
                        redirectTo: '/signin'
                    })
                } else {
                    console.log('Sign-up error');
                }
            }).catch(error => {
                console.log('Sign up server error')
                console.log(error);
            })
    }

    handleCancel = event => {
        event.preventDefault()
        window.location.replace("/")
    }

    render() {
        return (
            <div>
                <h1>Sign Up Form</h1>
                <br></br>
                <br></br>
                <div className="container-fluid">
                    <div className="row">
                        <div className="FormField">
                            <label for="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter Your Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <label for="username">ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Create Username"
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
                                placeholder="Create Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                                name="email"
                                value={this.state.email}
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

export default SignUp;
