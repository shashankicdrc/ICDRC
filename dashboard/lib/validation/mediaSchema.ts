import { z } from "zod";

const mediaSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    type: z.enum(["image", "video"], { message: "Please choose a valid type." }),
    image: z.string().optional(),
    video: z.string().optional(),
}).refine(data => {
    if (data.type === 'image') {
        return z.string().url().safeParse(data.image).success;
    }
    return true;
}, {
    message: 'Enter a valid image URL.',
    path: ['image'],
}).refine(data => {
    if (data.type === 'video') {
        return z.string().url().safeParse(data.video).success;
    }
    return true;
}, {
    message: "Enter a valid video URL.",
    path: ['video'],
});


export default mediaSchema;
