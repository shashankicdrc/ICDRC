import React from 'react';
import { authOptions } from '../../../../lib/authOptions';
import { getServerSession } from 'next-auth';
import { userPaymentHistory } from '../../../../externalAPI/paymentService';
import { Card, CardContent } from '../../../../components/ui/card';
import PaymentHistoryColumn from '../../../../components/dashboard/payment/PaymentColumn';
import { PaymentHistoryDataTable } from '../../../../components/dashboard/payment/DataTable';

export default async function page() {
    const session = await getServerSession(authOptions);
    const token = session.user.AccessToken;

    const { error, data } = await userPaymentHistory(token);
    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p className="text-destructive">{error}</p>
            </div>
        );
    }
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <h1 className="my-2 text-4xl font-semibold">Payment History</h1>
            <Card>
                <CardContent>
                    <PaymentHistoryDataTable
                        columns={PaymentHistoryColumn}
                        data={data}
                    />
                </CardContent>
            </Card>
        </main>
    );
}
