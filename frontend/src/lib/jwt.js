export async function decodeToken(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
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
