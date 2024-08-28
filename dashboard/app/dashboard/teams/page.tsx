import TeamItem from '@/components/teams/TeamItem';
import { Button } from '@/components/ui/button'
import { getTeams } from '@/externalAPI/teamService';
import { authOptions } from '@/lib/authOptions';
import { teamType } from '@/types/teamType';
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import React from 'react'

export default async function page() {
    const sesssion = await getServerSession(authOptions);
    const token = sesssion?.user.AccessToken as string;
    const { data, error } = await getTeams(token);
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center justify-between">
                <h1 className="my-2 text-4xl font-semibold">Manage Team of Experts</h1>
                <Button asChild>
                    <Link href="/dashboard/teams/add">
                        Add Experts
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                {data.length < 1 ? <div className="flex justify-center text-center mx-auto my-5 col-span-3">
                    <p className="font-bold">No Team of Experts found</p>
                </div>
                    : data.map((team: teamType) => <TeamItem team={team} key={team._id} />)}
            </div>

        </main>
    )
}


