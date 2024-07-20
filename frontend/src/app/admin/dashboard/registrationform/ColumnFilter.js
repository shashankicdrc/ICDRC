import { PolicyType, insurance } from "../../../../lib/constant";
import { State, } from "country-state-city";


const defaultOperators = [
    { label: 'Equals', value: 'eq' },
    { label: 'Not Equals', value: 'neq' },
];

export const OrganisationalcolumnFilters = [
    {
        accessorKey: "caseId",
        header: "Case Id",
        operators: [
            { label: "is", value: "eq" },             // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "before", value: "lt" },          // MongoDB equivalent: $lt
            { label: "after", value: "gt" }            // MongoDB equivalent: $gt
        ],
        inputType: "date"
    },
    {
        accessorKey: "status",
        header: "Case Status",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" }           // MongoDB equivalent: $ne
        ],
        inputType: "boolean"
    },
    {
        accessorKey: "email",
        header: "Email",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "isPay",
        header: "Payment Status",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" }           // MongoDB equivalent: $ne
        ],
        inputType: "boolean"
    },
    {
        accessorKey: "transactionId",
        header: "Transaction Id",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)

        ],
        inputType: "text"
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "state",
        header: "State",
        inputType: "select",
        values: State.getStatesOfCountry("IN").map(item => item.name)
    },
    {
        accessorKey: "organization_name",
        header: "Organization Name",
        inputType: "select",
        values: []
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        inputType: "select",
        operatores: defaultOperators,
        values: [...insurance, 'Others'],
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        inputType: "select",
        operators: defaultOperators,
        values: [...PolicyType, 'Others'],
    }];

const columnFilters = [
    {
        accessorKey: "caseId",
        header: "Case Id",
        operators: [
            { label: "is", value: "eq" },             // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "before", value: "lt" },          // MongoDB equivalent: $lt
            { label: "after", value: "gt" }            // MongoDB equivalent: $gt
        ],
        inputType: "date"
    },
    {
        accessorKey: "name",
        header: "Name",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "status",
        header: "Case Status",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" }           // MongoDB equivalent: $ne
        ],
        inputType: "boolean"
    },
    {
        accessorKey: "email",
        header: "Email",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "isPay",
        header: "Payment Status",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" }           // MongoDB equivalent: $ne
        ],
        inputType: "boolean"
    },
    {
        accessorKey: "transactionId",
        header: "Transaction Id",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)

        ],
        inputType: "text"
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "state",
        header: "State",
        inputType: "select",
        values: State.getStatesOfCountry("IN").map(item => item.name)
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        inputType: "select",
        operatores: defaultOperators,
        values: [...insurance, 'Others'],
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        inputType: "select",
        operators: defaultOperators,
        values: [...PolicyType, 'Others'],
    }];

export default columnFilters;

