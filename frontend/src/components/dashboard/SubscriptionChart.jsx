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
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { BASE_URL, httpStatus, httpStatusCode } from '@/lib/constant';
import { formatDate } from '@/lib/formateDate';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="grid grid-rows-2 gap-5">
            <Card>
                <CardHeader className="items-center pb-0">
                    <CardTitle>Individual</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center h-full">
                    {error.length ? (
                        <p className="my-2 text-center">{error}</p>
                    ) : subscriptionData.individual &&
                      subscriptionData.individual.isActive ? (
                        <div className="">
                            <ChartComp
                                chartConfig={chartConfig}
                                subscriptionData={subscriptionData}
                                type="Individual"
                            />
                            <div className="flex flex-col space-y-2 py-2 text-center">
                                <CardDescription>
                                    Your subscription will be expired on{' '}
                                    {formatDate(
                                        subscriptionData.individual.data
                                            .endDate,
                                    )}
                                    .
                                </CardDescription>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 justify-center">
                            <Image
                                src="/INACTIVE.webp"
                                width={200}
                                height={200}
                                alt="INACTIVE Image"
                            />
                            <CardDescription>
                                Your subscription is INACTIVE.{' '}
                            </CardDescription>
                            <Button
                                variant="link"
                                asChild
                                className="text-center mx-8"
                            >
                                <Link href="/dashboard/subscription?plan=66dc3f2cb7e56779f870c7ab">
                                    Subscribe Now
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="items-center pb-0">
                    <CardTitle>Organizational</CardTitle>
                </CardHeader>
                <CardContent className="flex  justify-center h-full">
                    {error.length ? (
                        <p className="my-2 text-center">{error}</p>
                    ) : subscriptionData.organisational &&
                      subscriptionData.organisational.isActive ? (
                        <div>
                            <ChartComp
                                chartConfig={chartConfig}
                                subscriptionData={subscriptionData}
                                type="organisational"
                            />
                            <div className="flex flex-col space-y-2 py-4 text-center">
                                <CardDescription>
                                    Your subscription will be expired on{' '}
                                    {formatDate(
                                        subscriptionData.organisational.data
                                            .endDate,
                                    )}
                                    .
                                </CardDescription>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 justify-center">
                            <Image
                                src="/INACTIVE.webp"
                                width={200}
                                height={200}
                                alt="INACTIVE Image"
                            />
                            <CardDescription>
                                Your subscription is INACTIVE.{' '}
                            </CardDescription>
                            <Button
                                variant="link"
                                asChild
                                className="text-center mx-8"
                            >
                                <Link href="/dashboard/subscription?plan=66dc3f1cb7e56779f870c7a9">
                                    Subscribe Now
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SubscriptionChart;

const ChartComp = ({ chartConfig, subscriptionData, type }) => {
    const chartData =
        type === 'Individual'
            ? subscriptionData.individual.chartData
            : subscriptionData.organisational.chartData;
    return (
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
                    data={chartData}
                    dataKey="total"
                    nameKey="days"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                                            className="fill-foreground text-xl font-bold"
                                        >
                                            {type === 'Individual'
                                                ? subscriptionData.individual
                                                      .isActive
                                                    ? 'Active'
                                                    : 'In Active'
                                                : null}
                                            {type === 'organisational'
                                                ? subscriptionData
                                                      .organisational.isActive
                                                    ? 'Active'
                                                    : 'In Active'
                                                : null}
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </Pie>
                <ChartLegend
                    content={<ChartLegendContent nameKey="days" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
            </PieChart>
        </ChartContainer>
    );
};
