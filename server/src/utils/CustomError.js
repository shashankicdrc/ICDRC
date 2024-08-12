/**
 * CustomError class to handle errors with a specific status code.
 * 
 * @class CustomError
 * @extends {Error}
 */
class CustomError extends Error {
    /**
     * Creates an instance of CustomError.
     * 
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code associated with the error.
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Set the name property to the name of the class
        this.name = this.constructor.name;

        // Capture the stack trace, excluding the constructor from it
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;

