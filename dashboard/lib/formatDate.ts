
import { format } from "date-fns";

export const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const formatedDate = format(date, "dd-MM-yyyy");
    return formatedDate;
};
