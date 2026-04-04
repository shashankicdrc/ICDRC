
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getMediationCases } from "@/externalAPI/mediationService";
import MediationList from "@/components/mediation/MediationList";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MediationPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div className="flex h-[80vh] items-center justify-center text-center p-6">
                <div className="space-y-4 max-w-sm">
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto opacity-80" />
                    <h2 className="text-2xl font-bold tracking-tight">Unauthorized</h2>
                    <p className="text-muted-foreground text-sm">Please log in to access the mediation dashboard.</p>
                    <Button asChild className="w-full">
                        <Link href="/auth/login">Login</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const token = session.user.AccessToken as string;
    const { data, error } = await getMediationCases(token);

    if (error) {
        return (
            <div className="flex flex-col h-[60vh] items-center justify-center p-6 bg-red-50/50 border border-red-100 mx-4 my-8 rounded-2xl shadow-sm">
                <div className="bg-red-100 p-4 rounded-full mb-6 text-red-600 shadow-sm border border-red-200">
                    <RefreshCw className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Service Error</h3>
                <p className="text-sm text-red-700 max-w-[400px] text-center font-medium mb-8 leading-relaxed">
                    {error}
                </p>
                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild className="text-red-700 hover:bg-red-50 border-red-200">
                        <Link href="/dashboard/mediation">Try Again</Link>
                    </Button>
                    <Button variant="ghost" asChild className="text-red-700 hover:bg-red-50">
                        <Link href="/dashboard">Return to Overview</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main className="flex-1 w-full space-y-2 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-slate-700 sm:text-5xl">
                        Mediation <span className="text-orange-500">Cases</span>
                    </h1>
                    <p className="text-slate-500 font-semibold text-md max-w-2xl">
                        Centralize and facilitate dispute resolutions. Monitor case flow, review detailed submissions and manage evidence.
                    </p>
                </div>
            </div>

            <section className="bg-slate-50/50 p-1 sm:p-2 rounded-[2rem] border border-slate-100/50">
                <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-[1.8rem] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                    <MediationList initialData={data || { cases: [], totalCount: 0, page: 1, perRow: 20 }} />
                </div>
            </section>
        </main>
    );
}
