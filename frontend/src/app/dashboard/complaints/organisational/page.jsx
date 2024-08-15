import React from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import { userOrganisationalComplaint } from '../../../../externalAPI/complaintService';
import { OrganisationlDataTable } from '../../../../components/dashboard/organisational/DataTable';
import OrganisationalColumns from '../../../../components/dashboard/organisational/organisationalColumn';

export default async function Organisational() {
    const session = await getServerSession(authOptions);
    const token = session.user.AccessToken;
    const { data, error } = await userOrganisationalComplaint(token);
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
                Your Organisational Complaints
            </h1>
            <Card>
                <CardContent>
                    <OrganisationlDataTable
                        columns={OrganisationalColumns}
                        data={data}
                    />
                </CardContent>
            </Card>
        </main>
    );
}
