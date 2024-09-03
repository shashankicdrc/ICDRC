import { caseStatus } from "@/types/complaint";
import { z } from "zod";

const caseStatusSchema = z.object({
    status: z.nativeEnum(caseStatus, { message: "Please choose case status." }),
})

export default caseStatusSchema; 
