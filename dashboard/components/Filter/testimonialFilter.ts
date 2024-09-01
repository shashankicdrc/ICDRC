import { ColumnFilter } from "@/types/columnFilter";

const TestimonialColumnFilters: ColumnFilter[] = [

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
        accessorKey: "designation",
        header: "Designation",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "review",
        header: "Review",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },

    {
        accessorKey: "stars",
        header: "Stars",
        operators: [
            { label: "greater than", value: "gte" },
            { label: "less than", value: "lte" },
        ],
        inputType: "text",
    },

];

export default TestimonialColumnFilters;
