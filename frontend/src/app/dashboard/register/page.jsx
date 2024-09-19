'use client';
import React from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../../components/ui/tabs';
import IndividualForm from '../../../components/dashboard/register/IndividualForm';
import OrganisationalForm from '../../../components/dashboard/register/OrganisationalForm';

export default function page() {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[65rem] flex-1 auto-rows-max gap-4">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Register A Complaint
                </h1>
            </div>
            <Tabs defaultValue="individual" className="w-full">
                <TabsList>
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="organisational">
                        Organizational
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="individual" className="w-full">
                    <IndividualForm />
                </TabsContent>
                <TabsContent value="organisational" className="w-full">
                    <OrganisationalForm />
                </TabsContent>
            </Tabs>
        </main>
    );
}
