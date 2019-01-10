import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        // bind 'this' to the functions
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        // Take whatever the user inputs and update the component state with it
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        axios.post('/api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data));
    }

    render() {
        const { errors } = this.state;
        const classes = 'form-control form-control-lg';

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your account</p>
                            {/* value is how you link the input field to the component state */}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames(classes, {'is-invalid': errors.name})} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={classnames(classes, {'is-invalid': errors.name})} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames(classes, {'is-invalid': errors.name})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames(classes, {'is-invalid': errors.name})} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
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

export default Register;