import React, { Component } from 'react';
import API from "../util/API";

// import router from "../../../server/routes/user"

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            userId: "",
            publications: "",
            topics: "",
            searchTerms: [],
            savedArticles: [],
            data: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        let id = localStorage.getItem("username");
        console.log("getting data for username: ", id);
        API.getUserData(id).then(res => {
            console.log("this is the response back from the db", res.data)
            this.setState({
                data: res.data
            })
            // axios.get("/userdata").then(response => {
        })
    }

    // getUserData() {
    // API to get user data - this route does not yet exist
    // }

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

    updatePubs = event => {
        event.preventDefault()
        window.location.replace("/updatePublications")
    }

    updateSearch = event => {
        event.preventDefault()
        window.location.replace("/updateSearchTerms")
    }

    updateUser = event => {
        event.preventDefault()
        window.location.replace("/updateUser")
    }


    render() {
        return (
            <div>
                <h4>{localStorage.getItem("username")}'s Profile</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Value</th>
                            <th scope="col">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Username</th>
                            <td>{this.state.username}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Publications</th>
                            {this.state.data.map(pubs => (
                                <td>{pubs.publications}</td>
                            ))}
                        </tr>
                        {this.state.data.map(topics => (
                            <tr>
                                <th scope="row">{topics.topics}</th>
                                {this.state.data.topics.map(searches => (
                                    <td>{searches.searchTerms}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        )
    }
}

export default UserProfile;
