import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
 
    onChange(e) {
        // Target the name and assign the state to whatever the user is typing
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(loginUser);
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your account</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" onChange={this.onChange}/>
                                    </div>
                                        <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;