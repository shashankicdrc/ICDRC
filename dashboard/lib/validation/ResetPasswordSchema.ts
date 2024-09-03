
import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        code: z
            .string()
            .min(6, { message: "Code should be 6 digit." })
            .max(6, { message: "Code should be 6 digit." }),
        password: z
            .string()
            .min(8, {
                message: "password must be at least 8 characters long",
            })
            .max(100)
            .regex(/^(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
                message:
                    "password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match.",
        path: ["confirmPassword"],
    });
