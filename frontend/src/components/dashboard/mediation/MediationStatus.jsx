import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';

const MediationStatus = ({ caseData }) => {
    if (!caseData) return null;

    const getStatusColor = (status) => {
        if (!status) return 'bg-yellow-500 hover:bg-yellow-600 text-white';
        if (status === 'Submitted' || status === 'Pending') return 'bg-yellow-500 hover:bg-yellow-600 text-white';
        if (status === 'In Progress') return 'bg-blue-500 hover:bg-blue-600 text-white';
        if (status === 'Resolved' || status === 'Done') return 'bg-green-500 hover:bg-green-600 text-white';
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    };

    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto animate-in fade-in duration-500">
            <Card className="border-l-4 border-l-orange-500 shadow-sm">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <CardTitle className="text-2xl text-orange-600">Mediation Request Submitted</CardTitle>
                            <CardDescription className="mt-2 text-base">
                                Your mediation request is currently under review. The form will be available again once this request is processed.
                            </CardDescription>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[150px] bg-muted/30 p-3 rounded-lg border">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-muted-foreground font-medium">Status:</span>
                                <Badge className={getStatusColor(caseData.status)}>{caseData.status || 'Submitted'}</Badge>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-muted-foreground font-medium">Payment:</span>
                                <Badge variant={caseData.paymentStatus === 'Pending' ? 'outline' : 'default'} className={caseData.paymentStatus === 'Pending' ? 'text-yellow-600 border-yellow-600' : 'bg-green-500'}>
                                    {caseData.paymentStatus || 'Pending'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card className="shadow-sm">
                <CardHeader className="bg-muted/10 border-b">
                    <CardTitle>Submitted Details</CardTitle>
                    <CardDescription>A summary of the information you provided</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8 md:grid-cols-2 p-6">
                    {/* Applicant Info */}
                    <div className="space-y-5">
                        <h3 className="font-semibold text-lg border-b pb-2 text-primary flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Applicant Information
                        </h3>
                        
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm items-center">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="font-medium bg-muted w-fit px-2 py-1 rounded-md">{caseData.caseType || 'Individual'}</span>
                        </div>
                        
                        {caseData.caseType === 'Organisation' && (
                            <>
                                <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                                    <span className="text-muted-foreground">Organisation:</span>
                                    <span className="font-medium">{caseData.organisationName}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                                    <span className="text-muted-foreground">Org Email:</span>
                                    <span className="font-medium truncate">{caseData.organisationEmail}</span>
                                </div>
                                <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                                    <span className="text-muted-foreground">Address:</span>
                                    <span className="font-medium">{caseData.organisationAddress}</span>
                                </div>
                            </>
                        )}
                        
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground">Full Name:</span>
                            <span className="font-medium">{caseData.fullName}</span>
                        </div>
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium truncate">{caseData.email}</span>
                        </div>
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground">Contact:</span>
                            <span className="font-medium">{caseData.contactNumber}</span>
                        </div>
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground">WhatsApp:</span>
                            <span className="font-medium">{caseData.whatsappNumber}</span>
                        </div>
                    </div>

                    {/* Opponent Info */}
                    <div className="space-y-5">
                        <h3 className="font-semibold text-lg border-b pb-2 text-primary flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Opposite Party
                        </h3>
                        
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-medium">{caseData.opponentName}</span>
                        </div>
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium truncate">{caseData.opponentEmail}</span>
                        </div>
                        <div className="grid grid-cols-[120px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground">Contact:</span>
                            <span className="font-medium">{caseData.opponentContact}</span>
                        </div>
                    </div>

                    {/* Dispute Details */}
                    <div className="space-y-5 md:col-span-2 pt-4 border-t">
                        <h3 className="font-semibold text-lg pb-1 text-primary flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Dispute Information
                        </h3>
                        
                        <div className="grid grid-cols-[150px_1fr] gap-3 text-sm">
                            <span className="text-muted-foreground font-medium">Dispute Amount:</span>
                            <span className="font-bold text-orange-600 text-base">₹{Number(caseData.amount)?.toLocaleString() || caseData.amount}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm bg-muted/20 p-5 rounded-lg border border-border/50">
                            <span className="text-muted-foreground font-medium block mb-2">Description:</span>
                            <p className="whitespace-pre-wrap leading-relaxed">{caseData.description}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MediationStatus;
