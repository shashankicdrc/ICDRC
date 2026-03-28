'use client';
import React, { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '../ui/dialog';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { initiatePayment } from '../../externalAPI/paymentService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MakePendingPayment = ({ paymentData }) => {
    const [paymentLoading, setpaymentLoading] = useState(false);
    const [open, setopen] = useState(false);
    const { data: session } = useSession();
    const token = session.user.AccessToken;
    const router = useRouter();

    const makePayment = async (e) => {
        e.preventDefault();
        setpaymentLoading((prevState) => !prevState);
        try {
            if (!token) return;
            if (!paymentData)
                return setpaymentLoading((prevState) => !prevState);
            const { error, data } = await initiatePayment(token, paymentData);
            setpaymentLoading((prevState) => !prevState);
            if (error) {
                toast.error(error);
                return;
            }
            router.push(data.redirectUrl);
        } catch (error) {
            console.error('Error while making payment:', error);
            setpaymentLoading((prevState) => !prevState);
            toast.error(error.message);
        }
    };

    return (
        <Fragment>
            <Dialog open={open} onOpenChange={setopen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="justify-start items-center py-0.5 px-2 w-full"
                    >
                        Make Payment
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Make Payment</DialogTitle>
                        <DialogDescription>
                            Your case has been registered sucessfully and an
                            email has been send regarding the case. For further
                            processing your case plase make the payment.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => setopen(false)}
                            variant="outline"
                            disabled={paymentLoading}
                        >
                            Cancel
                        </Button>
                        <Button disabled={paymentLoading} onClick={makePayment}>
                            {paymentLoading ? (
                                <>
                                    <Loader2
                                        className="animate-spin mr-2 w-4 h-4"
                                        size={30}
                                    />
                                    please wait ...
                                </>
                            ) : (
                                `Pay ₹${paymentData.amount}`
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default MakePendingPayment;
