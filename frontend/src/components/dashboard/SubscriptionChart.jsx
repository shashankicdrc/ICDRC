'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Pie, Label, PieChart } from 'recharts';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '../ui/chart';
import toast from 'react-hot-toast';
import { BASE_URL, httpStatus, httpStatusCode } from '@/lib/constant';
import { formatDate } from '@/lib/formateDate';

const chartConfig = {
    days: {
        label: 'Days',
    },
    remaining: {
        label: 'Remaining',
        color: 'hsl(var(--chart-1))',
    },
    used: {
        label: 'Used',
        color: 'hsl(var(--chart-2))',
    },
};

const SubscriptionChart = () => {
    const [error, seterror] = React.useState('');
    const [subscriptionData, setSubscriptionData] = React.useState({});
    const { data: session, status } = useSession();
    const token = session?.user.AccessToken;

    React.useEffect(() => {
        const getSubscriptionData = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/analytics/user/subscription`,
                    {
                        headers: {
                            'Contnet-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const { statusCode, status, message, data } =
                    await response.json();
                if (
                    httpStatusCode.OK !== statusCode &&
                    httpStatus.SUCCESS !== status
                ) {
                    return seterror(message);
                }
                setSubscriptionData(data);
            } catch (error) {
                seterror(error.message);
                toast.error(error.message);
            }
        };
        if (status === 'authenticated') {
            getSubscriptionData();
        }
    }, [session, token, status]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <Card>
            <CardHeader className="items-center pb-0">
                <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full">
                {error.length ? (
                    <p className="my-2 text-center">{error}</p>
                ) : subscriptionData && subscriptionData.isActive ? (
                    <div className="">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[300px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={subscriptionData.chartData}
                                    dataKey="total"
                                    nameKey="days"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                'cx' in viewBox &&
                                                'cy' in viewBox
                                            ) {
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
                                                            className="fill-foreground  font-bold"
                                                        >
                                                            {subscriptionData.isActive
                                                                ? 'Subscription Active'
                                                                : 'Subscription In Active'}
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                                <ChartLegend
                                    content={
                                        <ChartLegendContent nameKey="days" />
                                    }
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                        <div className="flex flex-col space-y-2 text-center">
                            <CardDescription>
                                You have choosen{' '}
                                {subscriptionData.subscription[0].planId.name}{' '}
                                plan.
                            </CardDescription>
                            <CardDescription>
                                Your subscription will be expired on{' '}
                                {formatDate(
                                    subscriptionData.subscription[0].endDate,
                                )}
                                .
                            </CardDescription>
                        </div>
                    </div>
                ) : (
                    <div className="my-10">
                        <p className="font-bold text-center">
                            Subscription In Active
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SubscriptionChart;
