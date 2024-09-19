import { ColumnFilter } from "@/types/columnFilter";

export const PaymentColumnFilters: ColumnFilter[] = [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
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
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "paymentFor",
        header: "Payment For",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "select",
        values: ["Subscription", "Case Registration"],
    },
    {
        accessorKey: "amount",
        header: "Amount",
        operators: [
            { label: "equals", value: "eq" },
            { label: "greater than", value: "gt" },
            { label: "less than", value: "lt" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        operators: [
            { label: "is", value: "eq" },
            { label: "is not", value: "ne" },
        ],
        inputType: "select",
        values: ["Success", "Failed"],
    },
    {
        accessorKey: "paymentDate",
        header: "Payment Date",
        operators: [
            { label: "before", value: "lt" },
            { label: "after", value: "gt" },
        ],
        inputType: "date",
    },
    {
        accessorKey: "subscriptionId",
        header: "Subscription Id",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "text",

    },
    {
        accessorKey: "complaintType",
        header: "Complaint Type",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "select",
        values: ["OrganizationComplaint", "IndividualComplaint"],
    },
    {
        accessorKey: "complaintId",
        header: "Complaint ID",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "text",
    },

];

export default PaymentColumnFilters;
