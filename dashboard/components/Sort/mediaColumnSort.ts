import { ColumnSort } from "@/types/columnFilter";

const MediaColumnSort: ColumnSort[] = [
    {
        accessorKey: "name",
        header: "Name",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "type",
        header: "Type",
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

export default MediaColumnSort;
