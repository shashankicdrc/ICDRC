import React, { Fragment } from 'react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCurrencyRupee } from 'react-icons/md';
import { Button } from '../../components/ui/button';

const page = ({ searchParams }) => {
    const message = searchParams.message;
    const transactionId = searchParams.transactionId;
    const amount = Math.round(searchParams.amount / 100);
    return (
        <Fragment>
            <main className="flex mx-auto md:w-[40%] items-center justify-center mt-40">
                <div className="rounded-md shadow-md border px-5 py-5 text-center">
                    <div className="flex justify-center">
                        <FaCheckCircle
                            className="text-xl text-green-700"
                            size={70}
                        />
                    </div>
                    <div className="my-3 space-y-2 text-center">
                        <h2 className="text-2xl font-bold justify-center flex space-x-1 items-center">
                            <MdCurrencyRupee size={20} />
                            <span> {amount}</span>
                        </h2>
                        <div className="space-y-2">
                            <h1 className="text-3xl">Payment sucessfull!</h1>
                            {message ? (
                                <p>
                                    Your payment is successfull but an error "
                                    {message}" occured during process.Please
                                    contact site owner.
                                </p>
                            ) : null}
                            <p className="text-gray-500 mb-3">
                                Your transactionId: {transactionId}
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </main>
        </Fragment>
    );
};

export default page;
