
import { z } from "zod";

const addTestimonialSchema = z.object({
    name: z
        .string()
        .max(50, { message: "Name should be less than 50 characters." }),
    designation: z
        .string()
        .max(50, { message: "Designation should be less than 50 characters." }),
    stars: z
        .number()
        .min(1, { message: "Stars must be at least 1." })
        .max(5, { message: "Stars must be at most 5." }),
    review: z
        .string()
        .max(150, {
            message: "Review should be less than 150  characters long.",
        }),
});

export default addTestimonialSchema;
