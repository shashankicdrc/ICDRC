import { AddTeamForm } from '@/components/form/team/AddTeamForm'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function page() {
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-5 md:mx-auto md:w-[80%]">
                <h1 className="my-5 text-4xl font-semibold text-center">Add Team of experts</h1>
                <Card>
                    <CardContent>
                        <AddTeamForm action="add" />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

