import Menu from "../../components/CaseStatus/Menu"

const formatCreatedAtDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const options = { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
    return createdAtDate.toLocaleDateString('en-GB', options);
};

export const OrganistionColumn = [
    {
        accessorKey: "caseId",
        header: "CaseId",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: (props) =>
            <p>{formatCreatedAtDate(props.getValue())}</p>
    },

    {
        accessorKey: "organization_name",
        header: "Organisation Name",
        cell: (props) => <p className="capitalize">{props.getValue()}</p>
    },
    {
        accessorKey: "status",
        header: "Case Status",
        cell: (props) => <p className="capitalize">{props.getValue()}</p>
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "isPay",
        header: "Payment Status",
        cell: (props) => <p>{props.getValue() ? 'Done' : 'Pending'}</p>
    },
    {
        accessorKey: "transactionId",
        header: "Transaction Id",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "country",
        header: "Country",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "state",
        header: "State",
        cell: (props) => <p className="capitalize">{props.getValue()}</p>
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        cell: (props) => <p>{props.getValue()}</p>,

    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const id = row.original._id;
            return <Menu caseType={"organisational"} caseId={id} />
        }
    }

];




const columns = [
    {
        accessorKey: "caseId",
        header: "CaseId",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: (props) =>
            <p>{formatCreatedAtDate(props.getValue())}</p>
    },

    {
        accessorKey: "name",
        header: "Name",
        cell: (props) => <p className="capitalize">{props.getValue()}</p>
    },
    {
        accessorKey: "status",
        header: "Case Status",
        cell: (props) => <p className="capitalize">{props.getValue()}</p>
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "isPay",
        header: "Payment Status",
        cell: (props) => <p>{props.getValue() ? 'Done' : 'Pending'}</p>
    },
    {
        accessorKey: "transactionId",
        header: "Transaction Id",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "country",
        header: "Country",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "state",
        header: "State",
        cell: (props) => <p className="capitalize">{props.getValue()}</p>
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
        cell: (props) => <p>{props.getValue()}</p>,

    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const id = row.original._id;
            return <Menu caseType={"individual"} caseId={id} />
        }
    }
];


export default columns;
