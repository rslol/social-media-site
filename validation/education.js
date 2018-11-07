const Validator = require('validator');
const isEmpty   = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let err = {};

    // if data.(type) is not empty, return data.(type), else if data.(type) is emprty, return an empty string
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';
  
    // Validate school
    if(Validator.isEmpty(data.school)) {
        err.school = 'School is required';
    }   
    
    // Validate degree
    if(Validator.isEmpty(data.degree)) {
        err.degree = 'Degree is required';
    }   

    // Validate from date
    if(Validator.isEmpty(data.from)) {
        err.from = 'From date is required';
    }   

     // Validate from date
     if(Validator.isEmpty(data.fieldOfStudy)) {
        err.fieldOfStudy = 'Study is required';
    }   

    return {
        err,
        isValid: isEmpty(err)
    }
}