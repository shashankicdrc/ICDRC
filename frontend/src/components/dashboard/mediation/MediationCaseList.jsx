'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '@chakra-ui/react';

const MediationCaseList = ({ cases }) => {
    if (!cases || cases.length === 0) return null;

    const activeCases = cases.filter((c) => c.status !== 'Closed');
    if (activeCases.length === 0) return null;

    return (
        <Card className="mt-6 border rounded-xl shadow-sm bg-white">
            <CardHeader className="border-b px-5 py-4">
                <CardTitle className="text-md font-semibold text-gray-800">
                    Mediation Cases
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
                {activeCases.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {/* Case ID */}
                            <div>
                                <p className="text-xs text-gray-500">Case ID</p>
                                <p className="font-medium text-sm">
                                    #{item.caseId || item._id?.substring(0, 8)}
                                </p>
                            </div>

                            {/* Name */}
                            <div>
                                <p className="text-xs text-gray-500">Full Name</p>
                                <p className="font-medium text-sm">
                                    {item.fullName}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-sm">
                                    {item.email}
                                </p>
                            </div>

                            {/* Case Status */}
                            <div>
                                <p className="text-xs text-gray-500">Case Status</p>
                                <Badge
                                    colorScheme={
                                        item.status === 'Open'
                                            ? 'blue'
                                            : item.status === 'InProgress'
                                            ? 'yellow'
                                            : 'green'
                                    }
                                >
                                    {item.status}
                                </Badge>
                            </div>

                            {/* Payment Status */}
                            <div>
                                <p className="text-xs text-gray-500">Payment Status</p>
                                <Badge
                                    colorScheme={
                                        item.paymentStatus === 'Paid'
                                            ? 'green'
                                            : 'orange'
                                    }
                                >
                                    {item.paymentStatus || 'Pending'}
                                </Badge>
                            </div>

                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default MediationCaseList;