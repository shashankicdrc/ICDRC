import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
        const reqUrl = request.nextUrl;
        const { pathname, search } = reqUrl;

        const searchParams = new URLSearchParams({
            url: encodeURIComponent(pathname + search),
        });

        return NextResponse.redirect(
            new URL(`/auth/login?${searchParams.toString()}`, request.url),
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
};
