'use client'
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { getSubscriptionData } from "@/externalAPI/analyticsService"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import Link from "next/link"

const chartConfig = {
    subscriptions: {
        label: "Subscriptions",
    },
    Organisational: {
        label: "Organizational",
        color: "hsl(var(--chart-1))",
    },
    Individual: {
        label: "Individual",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function SubscriptionData() {
    const [error, seterror] = React.useState<string>('')
    const [subscriptionData, setSubscriptionData] = React.useState<{ chartData: [], totalSubscription: number }>()
    const { data: session, status } = useSession()
    const token = session?.user.AccessToken as string
    React.useEffect(() => {
        if (status === 'authenticated') {
            const subscriptionsChartData = async () => {
                const { data, error } = await getSubscriptionData(token)
                if (error) {
                    seterror(error)
                } else {
                    setSubscriptionData(data)
                }
            }
            subscriptionsChartData()
        }
    }, [session])

    if (status === 'loading') {
        return <p>Loading...</p>
    }
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total Subscriptions</CardTitle>
                <CardDescription>Showing all three plan subscriptions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {error ? <p>{error}</p> :
                    subscriptionData?.totalSubscription > 0 ?
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
                                    data={subscriptionData?.chartData}
                                    dataKey="total"
                                    nameKey="plan"
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
                                                            {subscriptionData?.totalSubscription.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Subscriptions
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </Pie>
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="plan" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                        : <div className="flex items-center justify-center my-5"> 0 Subscriptions</div>
                }
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <Button asChild variant="link">
                    <Link href="/dashboard/subscriptions">View All Subscriptions</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

