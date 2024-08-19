
"use client";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { ColumnSort } from "@/types/columnFilter";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SortType {
    column: string;
    value: string;
}

interface Props {
    columnSorts: ColumnSort[];
}

const Sort = ({ columnSorts }: Props) => {
    const [userSorts, setUserSorts] = React.useState<SortType[]>([
        {
            column: "createdAt",
            value: "desc",
        },
    ]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    React.useEffect(() => {
        const sorts = searchParams.getAll("sort");

        if (!sorts.length) {
            const params = new URLSearchParams(searchParams.toString());
            const initialSortString = `desc(createdAt)`;
            params.append("sort", initialSortString);
            replace(`${pathname}?${params.toString()}`);
            return;
        }

        const uniqueSorts = new Set<string>();
        sorts.forEach((sort) => {
            uniqueSorts.add(sort);
        });

        const newSorts: SortType[] = Array.from(uniqueSorts)
            .map((sort) => {
                const data = sort.split(",");
                return data
                    .map((item) => {
                        const [value, column] = item.split("(");
                        if (!column || !value) return null;
                        const cleanColumn = column.substring(0, column.length - 1);
                        return { column: cleanColumn, value: value ?? "asc" };
                    })
                    .filter((item): item is SortType => item !== null);
            })
            .flat(); // Flatten the array since we're dealing with a nested structure

        if (newSorts.length > 0) {
            setUserSorts(newSorts);
        }
    }, [searchParams]);

    // Define handleAddSort function
    const handleAddSort = () => {
        setUserSorts([...userSorts, { column: "", value: "" }]);
    };

    // Define handleRemoveSorts function
    const handleRemoveSorts = (index: number) => {
        const newSorts = userSorts.filter((_, i) => i !== index);
        setUserSorts(newSorts);
        updateSearchParams(newSorts);
    };
    const updateSearchParams = (arr: SortType[]) => {
        const params = new URLSearchParams(searchParams.toString());
        const sortString = createSortQuery(arr);
        params.set("sort", sortString);
        replace(`${pathname}?${params.toString()}`);
    };

    const handleSortChange = (
        index: number,
        field: keyof SortType,
        value: string,
    ) => {
        const newSorts = [...userSorts];
        const sorts = newSorts[index];
        if (sorts !== undefined) {
            sorts[field] = value;
            setUserSorts(newSorts);

            if (!value || !field) return;

            if (field === "value" && value.length > 0) {
                updateSearchParams(newSorts);
            }
        }
    };

    const removeAllsort = () => {
        setUserSorts([]);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("sort");
        replace(`${pathname}?${params.toString()}`);
    };

    // Utility function to create a sort query string
    const createSortQuery = (arr: SortType[]): string => {
        return arr.map((sort) => `${sort.value}(${sort.column})`).join(",");
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    onClick={() => !userSorts.length && handleAddSort()}
                >
                    Sorts <Icons.sort className="ml-2 h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-fit">
                <div>
                    {userSorts.map((sort, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Select
                                value={sort.column}
                                onValueChange={(value) =>
                                    handleSortChange(index, "column", value)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a field" />
                                </SelectTrigger>
                                <SelectContent>
                                    {columnSorts.map((col) => (
                                        <SelectItem key={col.accessorKey} value={col.accessorKey}>
                                            {col.header}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {sort.column && (
                                <Select
                                    value={sort.value}
                                    onValueChange={(value) =>
                                        handleSortChange(index, "value", value)
                                    }
                                    disabled={!sort.column}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select an operator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sort.column &&
                                            columnSorts
                                                ?.find((col) => col.accessorKey === sort.column)
                                                ?.operators.map((op) => (
                                                    <SelectItem key={op.label} value={op.value}>
                                                        {op.label}
                                                    </SelectItem>
                                                ))}
                                    </SelectContent>
                                </Select>
                            )}

                            <button
                                onClick={() => handleRemoveSorts(index)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Icons.close />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="secondary" onClick={handleAddSort}>
                        <Icons.add className="mr-2" /> Add sort
                    </Button>
                    <Button onClick={removeAllsort} variant="destructive">
                        <Icons.delete className="mr-2" /> Remove All sort
                    </Button>
                </div>{" "}
            </PopoverContent>
        </Popover>
    );
};

export default Sort;
