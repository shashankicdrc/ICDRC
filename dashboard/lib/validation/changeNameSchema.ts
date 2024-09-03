
import { z } from "zod";

const changeNameSchema = z.object({
    name: z
        .string()
        .max(20, { message: "Name should be less than 20 character long." }),
});

export default changeNameSchema;
