import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BASE_URL } from './constant';
import { decodeToken, isResfreshToken } from './jwt';
import {
    getUserByEmail,
    createUser,
    verifySocialtoken,
} from '../externalAPI/userService';

export const providers = [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
                prompt: 'consent',
                access_type: 'offline',
                response_type: 'code',
            },
        },
        httpOptions: {
            timeout: 40000,
        },
    }),

    CredentialsProvider({
        name: 'Credentials',
        credentials: {},
        async authorize(credentials) {
            const result = await fetch(`${BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                }),
            });
            const response = await result.json();
            if (result.status !== 200) {
                return Promise.reject(new Error(response.message));
            }
            return response.data;
        },
    }),
];

export const authOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers,
    callbacks: {
        signIn: async ({ account, user }) => {
            if (!account?.provider) return false;
            switch (account.provider) {
                case 'google':
                    const { error } = await getUserByEmail(user.email);
                    if (error) {
                        const userData = {
                            email: user.email,
                            provider: account.provider,
                            providerId: account.providerAccountId,
                            profilePic: user.image,
                            name: user.name,
                        };
                        const { error: createUserError } =
                            await createUser(userData);
                        if (createUserError) {
                            return Promise.reject(new Error(createUserError));
                        }
                        return true;
                    }
                    return true;
                case 'credentials':
                    return true;
                default:
                    return false;
            }
        },

        jwt: async ({ token, user, account, trigger, session }) => {
            try {
                if (user) {
                    if (
                        account?.provider === 'google' ||
                        account?.provider === 'facebook'
                    ) {
                        const verifyToken = await verifySocialtoken(
                            account.id_token,
                        );
                        if (!verifyToken || verifyToken.error) {
                            throw new Error(
                                verifyToken?.error ||
                                    'Something went wrong. Please try again.',
                            );
                        }
                        token.AccessToken = verifyToken.access_token;
                        token.RefreshToken = verifyToken.refresh_token;
                        const accessToken = await decodeToken(
                            verifyToken.access_token,
                        );
                        token.AccessTokenExpiry = accessToken.exp;
                    } else {
                        const AccessToken = await decodeToken(user.AccessToken);
                        token.AccessToken = user.AccessToken;
                        token.AccessTokenExpiry = AccessToken.exp;
                        token.RefreshToken = user.RefreshToken;
                    }
                }

                if (trigger === 'update') {
                    token = { ...token, ...session.user };
                }

                const shouldRefreshTime = isResfreshToken(
                    token.AccessTokenExpiry,
                );

                if (!shouldRefreshTime) {
                    return token;
                }

                const refreshTokenData = await RefreshAccessToken(
                    token.AccessToken,
                    token.RefreshToken,
                );

                if (refreshTokenData.error) {
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
                session.user.email = accessToken.email;
                session.user.name = accessToken.name;
                session.user.image = token.image || token.picture;
                session.error = token.error;
            }

            return session;
        },
    },
};
