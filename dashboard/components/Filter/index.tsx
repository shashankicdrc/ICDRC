
"use client";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { ColumnFilter, UserFilter } from "@/types/columnFilter";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getOrganisationName } from "@/externalAPI/orgCaseService";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Props {
    columnFilters: ColumnFilter[];
}

export const Filter = ({ columnFilters }: Props) => {
    const [userFilters, setUserFilters] = React.useState<UserFilter[]>([]);
    const [organizationNames, setOrganizationNames] = React.useState<{ _id: string, organizationName: string }[]>([]);
    const { data: session } = useSession()
    const token = session?.user.AccessToken as string;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    React.useEffect(() => {
        async function fetchOrganizationNames() {
            try {
                if (!token) return;
                const { data, error } = await getOrganisationName(token)
                if (error) return toast.error(error)
                setOrganizationNames(data)
            } catch (error: any) {
                toast.error(error.message);
            }
        }
        if (pathname === '/dashboard/organisational') {
            fetchOrganizationNames();
        }
    }, [session]);

    React.useEffect(() => {
        const filters = searchParams.getAll("filter");
        const uniqueFilters = new Set(filters);

        const params = new URLSearchParams(searchParams as any);

        const newFilters = Array.from(uniqueFilters)
            .map((filter) => {
                let [column, operator, value] = filter.split(":");
                return { column, operator, value };
            })
            .filter(Boolean) as UserFilter[];

        replace(`${pathname}?${params.toString()}`);
        setUserFilters(newFilters);
    }, [searchParams]);

    const handleAddFilter = () => {
        setUserFilters([...userFilters, { column: "", operator: "", value: "" }]);
    };

    const handleRemoveFilter = (index: number) => {
        const newFilters = userFilters.filter((_, i) => i !== index);
        setUserFilters(newFilters);

        const params = new URLSearchParams(searchParams.toString());
        params.delete("filter"); // Remove all 'filter' params

        // Add back all filters except the one being removed
        newFilters.forEach((item) => {
            const filterValue = `${item.column}:${item.operator}:${item.value}`;
            params.append("filter", filterValue);
        });

        replace(`${pathname}?${params.toString()}`);
    };

    const handleFilterChange = (
        index: number,
        field: keyof UserFilter,
        value: string,
    ) => {
        // Create a copy of userFilters to avoid mutating state directly
        const newFilters = [...userFilters];

        // Ensure that newFilters[index] exists and is not null or undefined
        const filter = newFilters[index];
        if (filter != null) {
            filter[field] = value;

            setUserFilters(newFilters);

            if (value.length > 0) {
                const params = new URLSearchParams(searchParams as any);

                userFilters.forEach((filter) => {
                    const keysToRemove: string[] = [];
                    params.forEach((paramValue, key) => {
                        if (
                            key === "filter" &&
                            paramValue.startsWith(`${filter.column}:`)
                        ) {
                            keysToRemove.push(key);
                        }
                    });
                    keysToRemove.forEach((key) => params.delete(key));
                });

                // Add new filter params
                newFilters.forEach((item) => {
                    const filterValue = `${item.column}:${item.operator}:${item.value}`;
                    params.append("filter", filterValue);
                });

                replace(`${pathname}?${params.toString()}`);
            }
        }
    };

    const removeAllFilter = () => {
        setUserFilters([]);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("filter");
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    onClick={() => !userFilters.length && handleAddFilter()}
                >
                    Filters <Icons.filter className="ml-2 h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-fit">
                <div>
                    {userFilters.map((filter, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Select
                                value={filter.column}
                                onValueChange={(value) =>
                                    handleFilterChange(index, "column", value)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a field" />
                                </SelectTrigger>
                                <SelectContent>
                                    {columnFilters.map((col) => (
                                        <SelectItem key={col.accessorKey} value={col.accessorKey}>
                                            {col.header}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {filter.column && (
                                <Select
                                    value={filter.operator}
                                    onValueChange={(value) =>
                                        handleFilterChange(index, "operator", value)
                                    }
                                    disabled={!filter.column}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select an operator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filter.column &&
                                            columnFilters
                                                ?.find((col) => col.accessorKey === filter.column)
                                                ?.operators.map((op) => (
                                                    <SelectItem key={op.label} value={op.value}>
                                                        {op.label}
                                                    </SelectItem>
                                                ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {filter.column &&
                                columnFilters.find((col) => col.accessorKey === filter.column)
                                    ?.inputType === "text" && (
                                    <Input
                                        disabled={!filter.operator}
                                        placeholder="Value"
                                        value={filter.value}
                                        onChange={(e) =>
                                            handleFilterChange(index, "value", e.target.value)
                                        }
                                        className="w-auto"
                                    />
                                )}

                            {filter.column &&
                                columnFilters.find((col) => col.accessorKey === filter.column)
                                    ?.inputType === "date" && (
                                    <Input
                                        disabled={!filter.operator}
                                        placeholder="Value"
                                        type="date"
                                        value={filter.value}
                                        onChange={(e) =>
                                            handleFilterChange(index, "value", e.target.value)
                                        }
                                        className="w-auto"
                                    />
                                )}
                            {filter.column && filter.column === 'organizationName' && columnFilters.find(col => col.accessorKey === filter.column)?.inputType === 'select' && (
                                <Select
                                    value={filter.value}
                                    onValueChange={(val) => handleFilterChange(index, 'value', val)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a value" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {organizationNames.map(item =>
                                            <SelectItem key={item._id} value={item.organizationName}>
                                                {item.organizationName}
                                            </SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}


                            {filter.column && filter.column !== 'organizationName' && columnFilters.find(col => col.accessorKey === filter.column)?.inputType === 'select' && (
                                <Select
                                    value={filter.value}
                                    onValueChange={(val) => handleFilterChange(index, 'value', val)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a value" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {columnFilters.find(col => col.accessorKey === filter.column)?.values?.map((value, index) => (
                                            <SelectItem key={index} value={value}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            <button
                                onClick={() => handleRemoveFilter(index)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <Icons.close />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="secondary" onClick={handleAddFilter}>
                        <Icons.add className="mr-2" /> Add Filter
                    </Button>
                    <Button onClick={removeAllFilter} variant="destructive">
                        <Icons.delete className="mr-2" /> Remove All Filter
                    </Button>
                </div>{" "}
            </PopoverContent>
        </Popover>
    );
};
