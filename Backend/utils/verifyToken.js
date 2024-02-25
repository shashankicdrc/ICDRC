const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return ({ success: true, message: "Token verified." });

    } catch (err) {
        return ({ success: false, message: "Invalid token" });
    }
}

module.exports = verifyToken;