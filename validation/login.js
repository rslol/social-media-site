const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let err = {};

    // if data.(type) is not empty, return data.(type), else if data.(type) is emprty, return an empty string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

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

    return {
        err,
        isValid: isEmpty(err)
    }
}