import { ColumnFilter } from "@/types/columnFilter";

export const SubscriptionColumnFilters: ColumnFilter[] = [
    {
        accessorKey: "_id",
        header: "Subscription Id",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "userId",
        header: "User ID",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "complaintLimit",
        header: "Compliant Limit",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "usedComplaints",
        header: "Payment For",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "PlanId",
        header: "Plan Id",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "text",

    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        operators: [
            { label: "before", value: "lt" },
            { label: "after", value: "gt" },
        ],
        inputType: "date",
    },

    {
        accessorKey: "endDate",
        header: "End Date",
        operators: [
            { label: "before", value: "lt" },
            { label: "after", value: "gt" },
        ],
        inputType: "date",
    },
];

export default SubscriptionColumnFilters;
