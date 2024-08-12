import CustomError from "#utils/CustomError";
import { httpStatusCode } from "#utils/constant";
import logger from "#utils/logger";
import express from "express";
import { connections } from "mongoose";

const { Request, Response, NextFunction } = express;

/**
 * Middleware to handle errors in Express applications.
 *
 * @param {Error | CustomError} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {Response} - Returns the HTTP response with an error message.
 */
const ErrorMiddleware = (err, req, res, next) => {
    let statusCode;
    let message;

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        // if (err instanceof DatabaseError) {
        //     statusCode = httpStatusCode.BAD_REQUEST;
        //     message = err.message;
        // } else {
        statusCode = httpStatusCode.INTERNAL_SERVER_ERROR;
        message = err.message || "Internal Server Error";
        // }
    }

    switch (err.name) {
        case "JsonWebTokenError":
            message = "Json Web Token is invalid. Try again.";
            statusCode = httpStatusCode.UNAUTHORIZED;
            break;
        case "TokenExpiredError":
            message = "Json Web Token has expired. Try again.";
            statusCode = httpStatusCode.UNAUTHORIZED;
            break;
        default:
            break;
    }

    // Log the error appropriately
    if (err instanceof CustomError) {
        logger.warn(`Custom error: ${err.message}`, {
            statusCode: err.statusCode,
            stack: err.stack,
        });
    } else if (["JsonWebTokenError", "TokenExpiredError"].includes(err.name)) {
        logger.warn(`JWT error: ${err.message}`, {
            name: err.name,
            stack: err.stack,
        });
    } else {
        if (process.env.NODE_ENV === "production") {
            logger.error(`Error: ${err.message}`, { stack: err.stack });
        } else {
            logger.error(`Error: ${err.message}`, { stack: err.stack, details: err });
        }
    }


    return res.status(statusCode).json({
        status: "error",
        message,
    });
};

export default ErrorMiddleware;
