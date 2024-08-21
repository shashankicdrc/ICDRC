
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { adminLogin, adminTokenRotation } from "@/externalAPI/adminService";
import { decodeToken, isResfreshToken } from "./jwt";

export const providers = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {},
        async authorize(credentials: any) {
            const { error, data } = await adminLogin({
                email: credentials.email,
                password: credentials.password,
            });
            if (error) {
                return Promise.reject(new Error(error));
            }
            return data;
        },
    }),
];

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers,
    callbacks: {
        signIn: async ({ account }) => {
            if (!account?.provider) return false;
            return true;
        },
        /* Token is stored data after the successfull login
             user is return variable from the providers.the user is undefined initially.
            it is only avaible at login time at successful login
          */

        jwt: async ({ token, user, trigger, session }) => {
            try {
                if (user) {
                    const AccessToken = await decodeToken(user.AccessToken);
                    token.AccessToken = user.AccessToken;
                    token.AccessTokenExpiry = AccessToken.exp;
                    token.RefreshToken = user.RefreshToken;
                }

                if (trigger === "update") {
                    return { ...token, ...session.user }
                }

                const shouldRefreshTime = isResfreshToken(token.AccessTokenExpiry);

                if (!shouldRefreshTime) {
                    return token;
                }

                const refreshTokenData = await adminTokenRotation(
                    token.AccessToken,
                    token.RefreshToken,
                );

                if (refreshTokenData.error) {
                    // clear all data token session add the provide like thing in the client side to check
                    // if there is any error occured in the session or token logout the user and redirect
                    // to the signin page.
                    token.error = refreshTokenData.error;
                    return token;
                }

                const { exp } = await decodeToken(refreshTokenData.AccessToken);
                return {
                    ...token,
                    AccessToken: refreshTokenData.AccessToken,
                    RefreshToken: refreshTokenData.Refreshtoken,
                    AccessTokenExpiry: exp,
                };
            } catch (error) {
                console.error(error);
                throw Promise.reject(error);
            }
        },
        session: async ({ session, token }) => {
            if (token) {
                const accessToken = await decodeToken(token.AccessToken);
                session.user.AccessToken = token.AccessToken;
                session.user.RefreshToken = token.RefreshToken;
                session.user.id = accessToken.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = (token.image as string) || token.picture;
                session.user.role = accessToken.role;
                session.error = token.error;
            }

            return session;
        },
    },
};
