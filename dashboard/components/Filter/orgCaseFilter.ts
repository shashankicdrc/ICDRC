import { insurance, PolicyType } from "@/lib/constant";
import { ColumnFilter } from "@/types/columnFilter";
import { State, } from "country-state-city";


const OrgCaseColumnFilters: ColumnFilter[] = [
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
        accessorKey: "caseId",
        header: "Case ID",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "caseStatus",
        header: "Case Status",
        operators: [
            { label: "is", value: "eq" },
            { label: "is not", value: "ne" },
        ],
        inputType: "select",
        values: ["Pending", "Processing", "Completed"],
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        operators: [
            { label: "is", value: "eq" },
            { label: "is not", value: "ne" },
        ],
        inputType: "select",
        values: ["Pending", "Paid"],
    },
    {
        accessorKey: "problemDetails",
        header: "Problem Details",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },

    {
        accessorKey: "problem",
        header: "Problem",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "organizationName",
        header: "Organisation",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "select",
        values: []
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "select",
        values: [...PolicyType, 'Others'].sort(),
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "select",
        values: [...insurance, 'Others'].sort()
    },
    {
        accessorKey: "address",
        header: "Address",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "state",
        header: "State",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "select",
        values: State.getStatesOfCountry("IN").map(item => item.name).sort()
    },
    {
        accessorKey: "city",
        header: "City",
        operators: [
            { label: "is", value: "eq" },
            { label: "contains", value: "regex" },
        ],
        inputType: "text",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        operators: [
            { label: "before", value: "lt" },
            { label: "after", value: "gt" },
        ],
        inputType: "date",
    },
];

export default OrgCaseColumnFilters;
