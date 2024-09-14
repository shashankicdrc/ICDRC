'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Pie, Label, PieChart } from 'recharts'
import { getCompalintChartData } from '@/externalAPI/analyticsService'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'


const chartConfig = {
    complaints: {
        label: "Complaints",
    },
    individual: {
        label: "Individual",
        color: "hsl(var(--chart-1))",
    },
    organizational: {
        label: "Organizational",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


export default function ComplaintChart() {
    const [error, seterror] = React.useState<string>('')
    const [complaintData, setComplaintData] = React.useState<[]>()
    const { data: session, status } = useSession()
    const token = session?.user.AccessToken as string

    const totalComplaints = React.useMemo(() => {
        return complaintData?.reduce((acc, cur) => acc + (cur as any).total, 0)
    }, [complaintData])

    React.useEffect(() => {
        if (status === 'authenticated') {
            const complaintChartData = async () => {
                const { data, error } = await getCompalintChartData(token)
                if (error) {
                    seterror(error)
                } else {
                    setComplaintData(data)
                }
            }
            complaintChartData()
        }
    }, [session, token, status])
    if (status === 'loading') {
        return <p>Loading...</p>
    }
    return (
        <Card>
            <CardHeader className="items-center pb-0">
                <CardTitle>Total Complaints</CardTitle>
                <CardDescription>Showing total Complaints </CardDescription>
            </CardHeader>
            <CardContent>
                {error ? <p>{error}</p> :
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={complaintData}
                                dataKey="total"
                                nameKey="complaint"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalComplaints?.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Complaints
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />

                            </Pie>
                            <ChartLegend
                                content={<ChartLegendContent nameKey="complaint" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                }
                <div className="flex items-center space-x-2">
                    <Button variant="link" asChild>
                        <Link href="/dashboard/individual">Individual Case</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link href="/dashboard/organisational">Organizational Case</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

