import { ColumnSort } from "@/types/columnFilter";

const BlogColumnSort: ColumnSort[] = [
    {
        accessorKey: "name",
        header: "Name",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "description",
        header: "Description",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "content",
        header: "Content",
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

export default BlogColumnSort;
