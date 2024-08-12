import express from "express";
const { Request, Response, NextFunction } = express;
/**
 * A higher-order function to handle async functions in Express routes.
 *
 * @param {(req: Request, res: Response, next: NextFunction) => Promise<any>} fn - The async function to be wrapped.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} - A function that resolves the async function or catches errors.
 */
const asyncHandler =
    (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };

export default asyncHandler;

