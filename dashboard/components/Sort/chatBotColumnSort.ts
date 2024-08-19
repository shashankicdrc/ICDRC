import { ColumnSort } from "@/types/columnFilter";

const ChatBotColumnSort: ColumnSort[] = [
    {
        accessorKey: "name",
        header: "Name",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "email",
        header: "Email",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "issue",
        header: "Issue",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "mobile",
        header: "Phone Number",
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

export default ChatBotColumnSort;
