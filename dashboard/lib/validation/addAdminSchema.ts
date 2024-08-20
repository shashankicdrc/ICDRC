
import { z } from "zod";
import { adminRoleEnum } from "../commonEnum";

export const addAdminSchema = z
    .object({
        email: z.string().email({ message: "Please enter valid email address" }),
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters long",
            })
            .max(100)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
                message:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
            }),
        role: z.nativeEnum(adminRoleEnum, { message: "Role cannot be empty." }),
        name: z
            .string()
            .min(4, { message: "Name must be atleast 4 characters long." })
            .max(50, { message: "Name should be less than 50 characters." }),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password does not match.",
    });
