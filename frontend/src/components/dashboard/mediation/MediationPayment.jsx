'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, CreditCard, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { initiatePayment } from '../../../externalAPI/paymentService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const MediationPayment = ({ caseData, isSubscribed }) => {
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { data: session } = useSession();
    const token = session?.user?.AccessToken;
    const router = useRouter();

    const handleMakePayment = async () => {
        if (!token || !caseData) return;

        setPaymentLoading(true);
        try {
            const paymentData = {
                id: caseData._id,
                complaintType: 'MediationCase',
                amount: 500,
                userId: caseData.userId,
            };

            const { error, data } = await initiatePayment(token, paymentData);

            if (error) {
                toast.error(error);
                return;
            }

            if (data?.instrumentResponse?.redirectInfo?.url) {
                router.push(data.instrumentResponse.redirectInfo.url);
            } else {
                toast.error('Payment initiation failed. Please try again.');
            }
        } catch (err) {
            console.error('Payment error:', err);
            toast.error(err.message);
        } finally {
            setPaymentLoading(false);
        }
    };

    const isPending = caseData?.paymentStatus === 'Pending';

    return (
        <Card className="max-w-md mx-auto border-none shadow-lg dark:bg-[#1e293b]">
            <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                    {isPending ? (
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full">
                            <CreditCard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                    ) : (
                        <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-full">
                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                    )}
                </div>
                <CardTitle className="text-2xl font-bold">
                    {isPending ? 'Case Payment Required' : 'Payment Confirmed'}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                    Case ID:{' '}
                    <span className="font-mono">
                        {caseData?.caseId || caseData?._id}
                    </span>
                </p>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
                {isPending ? (
                    <>
                        <div className="text-center space-y-2">
                            <p className="text-muted-foreground leading-relaxed">
                                To proceed with your mediation case
                                registration, please complete the processing fee
                                payment.
                            </p>
                            <div className="text-3xl font-bold py-4">Pay now</div>
                        </div>

                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/10"
                            onClick={handleMakePayment}
                            disabled={paymentLoading}
                        >
                            {paymentLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 w-5 h-5" />
                                    Processing...
                                </>
                            ) : (
                                'Pay Now'
                            )}
                        </Button>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                                        Reviewing Your Case
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Our mediation experts have received your
                                        payment and are currently reviewing your
                                        documents. We will contact you shortly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MediationPayment;
