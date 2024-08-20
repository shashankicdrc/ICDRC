
import { z } from "zod";

export const createBlogSchema = z.object({
    name: z
        .string()
        .min(10, { message: "Name should be atleast 10 characters." })
        .max(80, { message: "Name can't be longer than 80 character." }),
    description: z
        .string()
        .min(10, { message: "Description should be atleast 10 characters." })
        .max(300, {
            message: "Description can't be longer than 300 character.",
        }),
    image: z.string().url({ message: "Please enter a valid url." }),
});
