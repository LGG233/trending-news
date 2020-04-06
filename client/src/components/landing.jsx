import React, { Component } from 'react';

class Landing extends Component {
  state = {};

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Wecome to Legal Trending Topics</h1>
          <div className="container-fluid">
            <p>
              Legal Trending Topics gives you real-time editorial guidance on the most important news and issues for
              your clients.{' '}
            </p>
            <p>
              Using data and analytics from Twitter, we identify the stories your audience is sharing, ranked in order
              of shares, to give you an up-to-date list of the topics that keep your clients up at night. Whether you're
              looking for the subject of your next blog post, developing and refining your content calendar, or
              researching issues for framing and perspective, Legal Trending Topics will guide you to the topics that
              resonate with your clients and potential clients.{' '}
            </p>
            <p>
              Just tell us the topics you want to track, the news sources you want to follow, and how often you wish to
              receive reports, and we do the rest. Our interface allows you to save articles and posts for later review,
              or click through to read the stories and see how major business and news outlets are framing the key
              issues within those topics.{' '}
            </p>
          </div>
          {/* <div>
                        <button className="btn btn-sm displayData"
                            onClick={function () {
                                window.location.replace("/signup");
                            }}
                        >
                            Sign Up{" "}
                        </button>
                        <button className="btn btn-sm newClient"
                            onClick={function () {
                                window.location.replace("/signin");
                            }}
                        >
                            Sign In{" "}
                        </button>
                    </div > */}
        </div>
      </div>
    );
  }
}
export default Landing;
