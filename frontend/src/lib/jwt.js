
import jwt from "jsonwebtoken";

export async function decodeToken(token) {
    const decoded = jwt.decode(token);
    return decoded;
}

export function isResfreshToken(expirationTime) {
    // if Accesstoken lifespan is 24h we will  refresh it 1 hour before
    if (expirationTime) {
        const expireTimeMillisecond = expirationTime * 1000; // Expiration time in milliseconds
        const refreshThreshold = 60 * 60 * 1000; // 1 hour in milliseconds
        const timeRemaining = expireTimeMillisecond - refreshThreshold - Date.now();
        return timeRemaining <= 0 ? true : false;
    }
    return false;
}
