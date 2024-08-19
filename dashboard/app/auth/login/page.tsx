import { LoginForm } from '@/components/form/LoginForm'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <main className="container flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm 2xl:max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email and password below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Suspense>
                            <LoginForm />
                        </Suspense>
                        <div className="single-signin relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Reset Password
                                </span>
                            </div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button aria-label="Reset password" variant="outline">
                                    Reset password
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Reset password request</DialogTitle>
                                    <DialogDescription>
                                        We will send a verification email to your existing email.
                                        Please ensure that you have type correct email.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </main>)
}

