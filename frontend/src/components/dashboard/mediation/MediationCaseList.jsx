'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '@chakra-ui/react';
import MediationScheduleForm from './MediationScheduleForm';

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
                                        item.paymentStatus === 'Success'
                                            ? 'green'
                                            : 'orange'
                                    }
                                >
                                    {item.paymentStatus || 'Pending'}
                                </Badge>
                            </div>

                        </div>

                        {/* Show schedule form only when case is Accepted and session not yet requested */}
                        {item.status === 'Accepted' && (
                            <div className="mt-4 pt-4 border-t">
                                <MediationScheduleForm 
                                    caseId={item._id} 
                                    onSuccess={() => window.location.reload()} 
                                />
                            </div>
                        )}

                        {/* Session info: show once session has been requested or mediator assigned */}
                        {['Session Requested', 'Mediator Assigned', 'Session Scheduled'].includes(item.status) && (
                            <div className="mt-4 pt-4 border-t">
                                <h4 className="text-sm font-semibold mb-2">
                                    {item.status === 'Mediator Assigned' ? ' Session Confirmed' : 'Session Requested'}
                                </h4>
                                <div className="bg-white p-3 rounded-lg border text-sm grid grid-cols-2 gap-2">
                                    <div><span className="text-gray-500">Mode:</span> {item.sessionMode}</div>
                                    <div><span className="text-gray-500">Date:</span> {item.sessionDate}</div>
                                    <div><span className="text-gray-500">Start:</span> {item.sessionStartTime}</div>
                                    <div><span className="text-gray-500">End:</span> {item.sessionEndTime}</div>
                                    {['Mediator Assigned', 'Session Scheduled'].includes(item.status) && item.googleMeetLink && (
                                        <div className="col-span-2 pt-2">
                                            <a
                                                href={item.googleMeetLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium"
                                            >
                                                Join Google Meet Session
                                            </a>
                                        </div>
                                    )}
                                    {['Mediator Assigned', 'Session Scheduled'].includes(item.status) && item.sessionMode === 'Offline' && (
                                        <div className="col-span-2 pt-2 text-gray-600 text-xs">
                                            📍 Please visit the ICDRC office physically at the scheduled time.<br/>
                                            <strong>Address:</strong> 6th Floor, Sanatan Building, Opp. CAG Office, Deendayal Upadhyay Marg, New Delhi
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default MediationCaseList;