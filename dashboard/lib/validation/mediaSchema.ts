import { z } from "zod";

const mediaSchema = z.object({
    name: z.string().min(5, { message: "Title must be atleast 5 characters long." }).max(30, { message: "Title should be less than 30 characters." }),
    type: z.enum(["image", "video"], { message: "Please choose one from type" }),
    image: z.string()
        .optional()
        .refine((val) => val === "" || z.string().url().safeParse(val).success, {
            message: "Image URL must be a valid URL if provided.",
        }),

    video: z.string()
        .optional()
        .refine((val) => val === "" || z.string().url().safeParse(val).success, {
            message: "Video URL must be a valid URL if provided.",
        })
})

export default mediaSchema;
