
import React from "react";
import ErrorFallback from "@/components/ErrorFallback";
import { authOptions } from "@/lib/authOptions";
import { Card, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { ErrorBoundary } from "react-error-boundary";
import { getAdmins } from "@/externalAPI/adminService";
import { AdminsDataTable } from "@/components/admins/DataTable";
import { adminColumns } from "@/components/admins/columns";

export default async function page() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("You are unauthorized.");
    const token = session.user.AccessToken as string;
    const { data, error } = await getAdmins(token);
    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p>{error}</p>
            </div>
        );
    }
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <h1 className="my-2 text-4xl font-semibold">Manage Admins</h1>
            <Card>
                <CardContent>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <AdminsDataTable data={data} columns={adminColumns} />
                    </ErrorBoundary>
                </CardContent>
            </Card>
        </main>
    );
}
