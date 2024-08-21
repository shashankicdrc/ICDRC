import { ColumnSort } from "@/types/columnFilter";

const SubscriptionColumnSort: ColumnSort[] = [
    {
        accessorKey: "userId",
        header: "User Id",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },

    {
        accessorKey: "usedComplaints",
        header: "Used Complaint",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "complaintLimit",
        header: "complaintLimit",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
];

export default SubscriptionColumnSort;
