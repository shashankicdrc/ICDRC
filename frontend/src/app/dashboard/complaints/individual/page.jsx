import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import { userIndividualComplaint } from '../../../../externalAPI/complaintService';
import { IndividualDataTable } from '../../../../components/dashboard/individual/DataTable';
import individualColumns from '../../../../components/dashboard/individual/IndividualColumn';

export default async function individual() {
    const session = await getServerSession(authOptions);
    const token = session.user.AccessToken;
    const { data, error } = await userIndividualComplaint(token);
    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p className="text-destructive">{error}</p>
            </div>
        );
    }
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <h1 className="my-2 text-4xl font-semibold">
                Your Individual Complaints
            </h1>
            <Card>
                <CardContent>
                    <IndividualDataTable
                        columns={individualColumns}
                        data={data}
                    />
                </CardContent>
            </Card>
        </main>
    );
}
