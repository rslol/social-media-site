const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validatePostInput(data) {
    let err = {};

    // if data.(type) is not empty, return data.(type), else if data.(type) is emprty, return an empty string
    data.text = !isEmpty(data.text) ? data.text : '';

    // Validate length
    if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
        err.text = 'Post must be between 10 and 300 characters';
    }    

    // Validate text 
    if(Validator.isEmpty(data.text)) {
        err.text = 'Text is required';
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}