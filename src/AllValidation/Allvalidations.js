// Validate Name (Allows only letters and spaces, between 2 to 50 characters)
exports.validname = (name) => {
    const validNameRegex = /^[A-Za-z\s]{2,50}$/;
    return validNameRegex.test(name);
};


// Validate Email (Standard email format check)
exports.validEmail = (email) => {
    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validEmailRegex.test(email);
};

// Validate Password (Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character)
exports.validpassword = (password) => {
    const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return validPasswordRegex.test(password);
};
