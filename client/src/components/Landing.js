import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="fluid-container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 text-center">
                                <h4 className="display-3 mb-4">You</h4>
                                <p className="lead">Your Profile</p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                            </div>
                            <div className="col-sm-12 col-md-6 text-center">
                                <h4 className="display-3 mb-4">Me</h4>
                                <p className="lead">My Personal Portfolio</p>
                                <Link className="btn btn-lg btn-info mr-2" to="/me">Portfolio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;