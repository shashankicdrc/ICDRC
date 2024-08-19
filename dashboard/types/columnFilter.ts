
type FilterOperator =
    | "eq"
    | "ne"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin"
    | "exists"
    | "regex"
    | "and"
    | "or"
    | "not"
    | "nor";

export type Operator = {
    label: string;
    value: FilterOperator;
};

export type ColumnFilter = {
    accessorKey: string;
    header: string;
    operators: Operator[];
    inputType: string;
};

export type UserFilter = {
    column: string;
    operator: string;
    value: string;
};

export interface SortOperator {
    label: string;
    value: "asc" | "desc";
}

export interface ColumnSort {
    accessorKey: string;
    header: string;
    operators: SortOperator[];
}
