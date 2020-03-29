import React, { Component } from 'react';
import axios from 'axios';

class AddPubs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publication: "",
            twitterHandle: "",
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
        console.log('Adding new publication to database...')
        console.log('Publication: ', this.state.publication)
        console.log('Twitter Handle: ', this.state.twitterHandle)
        axios.post('/newPub/', {
            username: this.state.publication,
            twitterName: this.state.twitterHandle
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log('publication added to database')
                    window.location.replace('/signin')
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
                <h1>Add New Publication</h1>
                <br></br>
                <br></br>
                <div className="container-fluid">
                    <div className="row">
                        <div className="FormField">
                            <label for="publication">Publication</label>
                            <input
                                type="text"
                                className="form-control"
                                id="publication"
                                placeholder="Enter Name of Publication"
                                name="publication"
                                value={this.state.publication}
                                onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <label for="twitterhandle">Twitter Handle</label>
                            <input
                                type="text"
                                className="form-control"
                                id="twitterhandle"
                                placeholder="Enter Twitter Handle of Publication"
                                name="twitterhandle"
                                value={this.state.twitterHandle}
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

export default AddPubs;


