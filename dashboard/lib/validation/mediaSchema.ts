import { z } from "zod";

const mediaSchema = z.object({
    name: z.string(),
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
