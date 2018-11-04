const isEmpty = (value) => {
    return (
        // if the value is undefined
        value === undefined ||
        // if the value doesnt exist
        value === null ||
        // if the value is an object and the object is empty
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        // if the value is a string and after removing the whitespace at the beginning and end of the string results in zero
        (typeof value === 'string' && value.trim().length === 0)
    );
}

module.export = isEmpty;