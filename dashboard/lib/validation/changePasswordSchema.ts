
import { z } from "zod";

const PasswordSchema = z
    .object({
        password: z.string().min(1, { message: "Password can't be empty." }),
        confirmPassword: z.string(),
        newPassword: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters long",
            })
            .max(100)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
                message:
                    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
            }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Password doesn't match.",
        path: ["confirmPassword"],
    });

export default PasswordSchema;
