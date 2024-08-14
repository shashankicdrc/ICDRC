import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import SignupForm from '../../../components/form/SignupForm'

export default function page() {
    return (
        <div className="border max-w-lg w-full px-5 py-5 rounded-md my-5">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold">Create your account</h2>
            </div>
            <div className="grid gap-4 my-5">
                <SignupForm />
            </div>
            <div className="grid gap-4">
                <div className="single-signin relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-background px-2 tex-2xl">
                            Do you have an account?
                        </span>
                    </div>
                </div>
                <Button variant={"outline"} asChild>
                    <Link href={"/auth/login"}>Signin</Link>
                </Button>
            </div>
        </div>)
}

