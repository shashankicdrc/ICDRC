const jwt = require('jsonwebtoken');
console.log("3");
const verifyToken = (token) => {
    console.log("4");
    try {
        console.log(token);
        console.log("5");
       
        jwt.verify(token, process.env.JWT_SECRET);
       
        return ({ success: true, message: "Token verified." });

    } 
    
    catch (err) {
        
        return ({ success: false, message: "Invalid token" });
    }
}

module.exports = verifyToken;
