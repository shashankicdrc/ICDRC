export const OrganisationalcolumnFilters = [
    {
        accessorKey: "caseId",
        header: "CaseId",
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
        accessorKey: "organization_name",
        header: "Organisation Name",
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
        accessorKey: "country",
        header: "Country",
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
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    }
];

const columnFilters = [
    {
        accessorKey: "caseId",
        header: "CaseId",
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
        accessorKey: "country",
        header: "Country",
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
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        operators: [
            { label: "is", value: "eq" },              // MongoDB equivalent: $eq
            { label: "is not", value: "ne" },          // MongoDB equivalent: $ne
            { label: "contains", value: "regex" },     // MongoDB equivalent: $regex
            { label: "does not contain", value: "not" } // MongoDB equivalent: $not (with $regex)
        ],
        inputType: "text"
    }
];

export default columnFilters;

