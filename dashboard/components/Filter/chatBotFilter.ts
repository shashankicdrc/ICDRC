import { ColumnFilter } from "@/types/columnFilter";

const ChatBotColumnFilters: ColumnFilter[] = [
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
        accessorKey: "email",
        header: "Email",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },

    {
        accessorKey: "mobile",
        header: "Phone Number",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "issue",
        header: "Issue",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },

];

export default ChatBotColumnFilters;
