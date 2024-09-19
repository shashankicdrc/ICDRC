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
        accessorKey: "email",
        header: "Email",
        operators: [
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },

];

export default SubscriptionColumnFilters;
