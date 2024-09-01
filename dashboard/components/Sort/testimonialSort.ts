import { ColumnSort } from "@/types/columnFilter";

const TestimonialColumnSort: ColumnSort[] = [
    {
        accessorKey: "name",
        header: "Name",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "designation",
        header: "Designation",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "stars",
        header: "Stars",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },

];

export default TestimonialColumnSort;
