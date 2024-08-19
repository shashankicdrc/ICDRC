
import "next-auth/jwt";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { User } from "next-auth";
import { adminRole } from "@/lib/commonEnum";

declare module "next-auth" {
    interface Session {
        user: User;
        error?: string;
    }

    interface User {
        AccessToken: string;
        RefreshToken: string;
        role: adminRole;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        AccessToken: string;
        RefreshToken: string;
        AccessTokenExpiry: number | undefined;
        error?: string;
    }
}
