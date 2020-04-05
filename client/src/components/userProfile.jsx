import React, { Component } from 'react';
import { Redirect, navigate } from '@reach/router'
import { ApiService } from '../services';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            userId: "",
            dummyData: "",
            publications: {
                name: "",
                twitterHandle: ""
            },
            topics: {
                name: "",
                searchTerm: []
            },
            savedArticles: {
                title: "",
                link: ""
            },
            data: [],
            redirectTo: null
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        ApiService.get("user/data/")
            .then(res => {
                this.setState({
                    data: res.data
                });
            })
        console.log("here is the state", this.state)
    };

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
                    <br></br>
                    <br></br>
                    <div className="container-fluid">
                        <div className="row">
                            <p>Name: {this.state.name}
                                <button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editName(this.state.userId)}>Edit</button>
                            </p>
                        </div>
                        <div className="row">
                            <p>Username: {this.state.username}
                                <button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editUsername(this.state.userId)}>Edit</button>
                            </p>
                        </div>
                        <div className="row">
                            <p>Email: {this.state.email}
                                <button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editEmail(this.state.userId)}>Edit</button>
                            </p>
                        </div>
                        <div className="row">
                            <p>Dummy Data: {this.state.dummyData}
                                <button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editDummy(this.state.userId)}>Edit</button>
                            </p>
                        </div>
                        {/* <div className="row">
                            {this.state.data.publications.map(pubs => (
                                <p>Publications</p>,
                                <p>{pubs.name}: {pubs.twitterHandle}</p>
                            ))}
                            <button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editPubs(this.state.userId)}>Edit</button>
                        </div>
                        <div className="row">
                            {this.state.data.topics.map(topics => (
                                <p>Topics </p>,
                                <p>{topics.name}: {topics.searchTerm}</p>
                            ))}
                            <button className="btn btn-sm btn-secondary card-btn" onClick={() => this.editTopics(this.state.userId)}>Edit</button>
                        </div>
                        <div className="row">
                            <p>Saved Articles:</p>
                            {this.state.data.savedArticles.map(articles => (
                                <p>Articles</p>,
                                <p>{articles.name}: {articles.link}</p>
                            ))}

                        </div> */}
                    </div>
                </div >
            )
        }
    }
}

export default UserProfile;