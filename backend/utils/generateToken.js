const jwt = require('jsonwebtoken')

// function to generate auth token
const generateToken = (_id, name, role, emailId) => {
    return jwt.sign({ 
        _id, 
        name, 
        role, 
        emailId,
        id: _id, // NextAuth needs this
        email: emailId // NextAuth needs this 
    }, process.env.JWT_SECRET, { expiresIn: '30d' }) 
}

module.exports = generateToken;
