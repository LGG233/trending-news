import React, { Component } from 'react';

class Home extends Component {
    state = {}

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="container-fluid">
                        <p>You are now logged in</p>
                    </div>
                    <div>
                        {/* <button className="btn btn-sm displayData"
                            onClick={function () {
                                window.location.replace("/signup");
                            }}
                        >
                            My Topics{" "}
                        </button>
                        <button className="btn btn-sm newClient"
                            onClick={function () {
                                window.location.replace("/signin");
                            }}
                        >
                            My Publications{" "}
                        </button> */}
                    </div >
                </div>
            </div>)
    }
}
export default Home;
