import express from "express";
import { httpStatus } from "#utils/constant";

const { Response } = express;

/**
 * @typedef {Object} dtoInterface
 * @property {number} statusCode - The HTTP status code.
 * @property {httpStatus} status - The status of the response (e.g., success, fail, error).
 * @property {string}
 * message - The message to be sent in the response.
 * @property {any} [data] - Optional additional data to be sent in the response.
 */

/**
 * Base class providing a method for sending standardized JSON responses.
 * @abstract
 */

export class Base {
    /**
     * Send a JSON response with the provided status, message, and optional data.
     *
     * @protected
     * @param {Response} res - The Express response object.
     * @param {number} statusCode - The HTTP status code.
     * @param {httpStatus} status - The status of the response.
     * @param {string} message - The message to be sent in the response.
     * @param {any} [data] - Optional additional data to be included in the response.
     * @returns {Response} - The Express response object.
     */
    response(res, statusCode, status, message, data) {
        /** @type {dtoInterface} */
        const dto = { statusCode, status, message };

        if (data) dto.data = data;
        return res.status(statusCode).json(dto);
    }
}
