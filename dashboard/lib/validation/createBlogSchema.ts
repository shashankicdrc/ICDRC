
import { z } from "zod";

export const createBlogSchema = z.object({
    name: z
        .string()
        .max(200, { message: "Title can't be longer than 200 character." }),
    description: z
        .string()
        .min(10, { message: "Description should be atleast 10 characters." }),
    image: z.string().url({ message: "Please enter a valid url." }),
});
