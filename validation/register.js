const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let err = {};

    // if data.(type) is not empty, return data.(type), else if data.(type) is emprty, return an empty string
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    // Validate name
    if(!Validator.isLength(data.name, { min: 2, max: 30 })){
        err.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)) {
        err.name = 'Name is required';
    }

    // Validate email 
    if(Validator.isEmpty(data.email)) {
        err.email = 'Email is required';
    }

    if(!Validator.isEmail(data.email)){
        err.email = 'Email is invalid';
    }

    // Validate password
    if(Validator.isEmpty(data.password)) {
        err.password = 'Password is required';
    }    

    if(!Validator.isLength(data.passowrd, { min: 6, max: 30})){
        err.password = 'Password length needs to be between 6-30 characters';
    }

    // Validate Password2
    if(Validator.isEmpty(data.password2)) {
        err.password2 = 'Confirm password is required';
    }

    // Confirm password and password2 are the same
    if(!Validator.equals(data.password, data.password2)) {
        err.password2 = 'Passwords must match';
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}