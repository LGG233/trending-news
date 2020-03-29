import React, { Component } from 'react';
import axios from 'axios';

class AddTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: "",
            searchTerm: "",
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
        console.log('Adding new topic to database...')
        console.log('Topic: ', this.state.topic)
        console.log('Search Term: ', this.state.searchTerm)
        axios.post('/newTopic/', {
            topic: this.state.topic,
            searchTerm: this.state.searchTerm
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log('topic added to database')
                    window.location.replace('/')
                } else {
                    console.log('Error; please try again');
                }
            }).catch(error => {
                console.log('Here is what went wrong: ', error)
            })
    }

    handleCancel = event => {
        event.preventDefault()
        window.location.replace("/")
    }

    render() {
        return (
            <div>
                <h1>Add New Topic</h1>
                <br></br>
                <br></br>
                <div className="container-fluid">
                    <div className="row">
                        <div className="FormField">
                            <label for="topic">Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                id="topic"
                                placeholder="Enter Topic"
                                name="topic"
                                value={this.state.topic}
                                onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <label for="searchterm">Search Term</label>
                            <input
                                type="text"
                                className="form-control"
                                id="searchterm"
                                placeholder="Enter Search Term"
                                name="searchterm"
                                value={this.state.searchTerm}
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

export default AddTopic;


