const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let err = {};

    // if data.(type) is not empty, return data.(type), else if data.(type) is emprty, return an empty string
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        err.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if(Validator.isEmpty(data.handle)) {
        err.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.status)) {
        err.status = 'Status field is required';
    }

    if(Validator.isEmpty(data.skills)) {
        err.skills = 'Skills field is required';
    }

    // Since its not required, if its not empty, then run Validator code
    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            err.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            err.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            err.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            err.website = 'Not a valid URL';
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            err.website = 'Not a valid URL';
        }
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}