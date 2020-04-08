import React, { Component } from 'react';
import { Redirect, navigate } from '@reach/router'
import MyInfo from "./userinfo";
import MyPublications from "./publications";
import MyTopics from "./topics";
import MyArticles from "./articles";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            userId: "",
            dummyData: "",
            publications: [],
            topics: [],
            savedArticles: [],
            data: [],
            redirectTo: null
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
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

    handleCancel = event => {
        event.preventDefault();
        navigate('/');
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        } else {
            return (
                <div>
                    <h1>User Profile for {localStorage.getItem("username")}</h1>
                    <MyInfo />
                    <br></br>
                    <MyPublications />
                    <br></br>
                    <MyTopics />
                    <br></br>
                    <MyArticles />
                </div >
            )
        }
    }
}

export default UserProfile;