import { ColumnFilter } from "@/types/columnFilter";

const BlogColumnFilters: ColumnFilter[] = [
    {
        accessorKey: "name",
        header: "Name",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "description",
        header: "description",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        operators: [
            { label: "before", value: "lt" },
            { label: "after", value: "gt" },
        ],
        inputType: "date",
    },

];

export default BlogColumnFilters;
