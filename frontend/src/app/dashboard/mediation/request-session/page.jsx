'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MediationScheduleForm from '../../../../components/dashboard/mediation/MediationScheduleForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { ChevronLeft, CalendarCheck } from 'lucide-react';

export default function RequestSessionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const caseId = searchParams.get('caseId');

    if (!caseId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Invalid Access</h2>
                <p className="text-muted-foreground mb-6">No case ID provided. Please follow the link in your email.</p>
                <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            </div>
        );
    }

    const handleSuccess = () => {
        // Redirect to dashboard or mediation list after success
        router.push('/dashboard/mediation');
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-slate-50/50">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => router.back()}
                            className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Request Mediation Session</h1>
                        <p className="text-slate-500">Please provide your preferred date and time for the mediation session.</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    <Card className="border-none shadow-md overflow-hidden bg-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Session Details</CardTitle>
                            <CardDescription>
                                For Case ID: <span className="font-mono text-slate-500">#{caseId}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MediationScheduleForm 
                                caseId={caseId} 
                                onSuccess={handleSuccess} 
                            />
                        </CardContent>
                    </Card>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold">Important Note:</p>
                            <p className="mt-1 opacity-90">
                                Once you submit your request, our team will review it and assign a mediator. 
                                You will receive a confirmation email with the final session details and link.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
