
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import { join } from "path";

const options = {
    algorithm: "ES256",
    expiresIn: "24h",
};

const getPrivateKeySecret = () => {
    const filePath = join(process.cwd(), "private_key.pem");
    const secretKey = readFileSync(filePath);
    return secretKey;
};

const getPublicKeySecret = () => {
    const filePath = join(process.cwd(), "public_key.pem");
    const secretKey = readFileSync(filePath);
    return secretKey;
};


const getAccessToken = async (payload) => {
    const secret = getPrivateKeySecret();
    const token = jwt.sign(payload, secret, options);
    return token;
};
const getRefreshToken = async (paylod) => {
    const secret = getPrivateKeySecret();
    const token = jwt.sign(paylod, secret, {
        ...options,
        expiresIn: "30d",
    });
    return token;
};

const verifyToken = async (token, option) => {
    const secret = getPublicKeySecret();
    const isVerified = jwt.verify(token, secret, option);
    return isVerified;
};

export {
    getPrivateKeySecret,
    getRefreshToken,
    getAccessToken,
    getPublicKeySecret,
    verifyToken,
    options,
};
