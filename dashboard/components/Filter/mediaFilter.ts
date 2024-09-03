import { ColumnFilter } from "@/types/columnFilter";

const MediaColumnFilters: ColumnFilter[] = [
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
        accessorKey: "type",
        header: "Type",
        operators: [
            { label: "is", value: "eq" },
        ],
        inputType: "select",
        values: ['image', 'video']
    },

];

export default MediaColumnFilters;
