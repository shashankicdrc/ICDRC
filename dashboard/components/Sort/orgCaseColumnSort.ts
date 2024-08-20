import { ColumnSort } from "@/types/columnFilter";

const OrgCaseColumnSort: ColumnSort[] = [
    {
        accessorKey: "organizationName",
        header: "Organisation",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },

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
        accessorKey: "mobile",
        header: "Phone Number",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "caseId",
        header: "Case ID",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "caseStatus",
        header: "Case Status",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "city",
        header: "City",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "problemDetails",
        header: "Problem Details",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "problem",
        header: "Problem",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "address",
        header: "Address",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "state",
        header: "State",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        operators: [
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" },
        ],
    },
];

export default OrgCaseColumnSort;
