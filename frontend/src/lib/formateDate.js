import { format } from 'date-fns';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatedDate = format(date, 'dd-MM-yyyy HH:MM:SS');
    return formatedDate;
};
