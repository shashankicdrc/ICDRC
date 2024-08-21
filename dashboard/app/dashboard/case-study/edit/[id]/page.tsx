import { AddCaseStudyForm } from '@/components/form/caseStudy/AddCaseStudyForm'
import { Card, CardContent } from '@/components/ui/card'
import { getCaseStudyById } from '@/externalAPI/caseStudyService'
import React from 'react'

interface Props {
    params: {
        id: string
    }
}

export default async function page({ params }: Props) {
    const { error, data } = await getCaseStudyById(params.id)
    if (error) {
        return (
            <div className="flex items-center justify-center mx-auto">
                <p>{error}</p>
            </div>
        )
    }
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-5 md:mx-auto md:w-[80%]">
                <h1 className="my-5 text-4xl font-semibold text-center">Edit Case Study</h1>
                <Card>
                    <CardContent>
                        <AddCaseStudyForm action="edit" data={data} />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

