
import { z } from "zod";

const changeNameSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be atleast 4 character long." })
        .max(20, { message: "Name should be less than 20 character long." }),
});

export default changeNameSchema;
