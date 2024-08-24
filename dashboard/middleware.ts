import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const pathname = request.nextUrl.pathname;

    if (!session && pathname !== "/auth/login") {
        const searchParams = new URLSearchParams({ url: pathname });
        return NextResponse.redirect(
            new URL(`/auth/login?${searchParams.toString()}`, request.nextUrl.origin),
        );
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard/:path*",
};
