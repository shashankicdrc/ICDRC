
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const chartConfig = {
    complaints: {
        label: "Visitors",
    },
    individual: {
        label: "Inddividual",
        color: "hsl(var(--chart-1))",
    },
    organisational: {
        label: "Organisational",
        color: "hsl(var(--chart-2))",
    },
    subscription: {
        label: "Subscription",
        color: 'hsl(var(--chart-3))'
    }
} satisfies ChartConfig

interface Props {
    chartData: any
}

const chartData = [
    {
        date: "2024-08-13",
        individual: 5000,
        organisational: 24000,
        subscription: 3000
    },
    {
        date: "2024-08-14",
        individual: 7000,
        organisational: 26000,
        subscription: 5000
    },
    {
        date: "2024-08-15",
        individual: 10000,
        organisational: 22000,
        subscription: 4000
    },
    {
        date: "2024-08-16",
        individual: 12000,
        organisational: 20000,
        subscription: 4500
    },
    {
        date: "2024-08-17",
        individual: 15000,
        organisational: 18000,
        subscription: 6000
    },
    {
        date: "2024-08-18",
        individual: 16000,
        organisational: 15000,
        subscription: 7000
    },
    {
        date: "2024-08-19",
        individual: 18000,
        organisational: 14000,
        subscription: 8000
    },
    {
        date: "2024-08-20",
        individual: 33000,
        organisational: 3000,
        subscription: 9000
    }

];

export function RevenueChart({ }: Props) {
    const [timeRange, setTimeRange] = React.useState<string>('10')
    const searchParams = useSearchParams();
    const pathaname = usePathname();
    const { replace } = useRouter();

    React.useEffect(() => {
        const revenueDays = searchParams.get('revenueDays');
        if (!revenueDays?.length) {
            const params = new URLSearchParams(searchParams.toString())
            params.set('revenueDays', timeRange)
            replace(`${pathaname}?${params.toString()}`)
        }
    }, [searchParams])

    const onTimeRangeChanage = (value: string) => {
        setTimeRange(value)
        const params = new URLSearchParams(searchParams.toString());
        params.set('revenueDays', value)
        replace(`${pathaname}?${params.toString()}`)
    }
    return (
        <Card className="col-span-2">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Total Revenue</CardTitle>
                    <CardDescription>
                        Showing total revenue for the last {timeRange} days
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={onTimeRangeChanage}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="30" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="10" className="rounded-lg">
                            Last 10 days
                        </SelectItem>
                        <SelectItem value="7" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={0}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Bar dataKey="individual" fill="var(--color-individual)" radius={4} />
                        <Bar dataKey="organisational" fill="var(--color-organisational)" radius={4} />
                        <Bar dataKey="subscription" fill="var(--color-subscription)" radius={4} />
                        <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
