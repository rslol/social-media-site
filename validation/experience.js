const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let err = {};

    // if data.(type) is not empty, return data.(type), else if data.(type) is emprty, return an empty string
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
  
    // Validate Title
    if(Validator.isEmpty(data.title)) {
        err.title = 'Job title is required';
    }   
    
    // Validate Company
    if(Validator.isEmpty(data.company)) {
        err.company = 'Company is required';
    }   

    // Validate 
    if(Validator.isEmpty(data.from)) {
        err.from = 'From date is required';
    }   

    return {
        err,
        isValid: isEmpty(err)
    }
}