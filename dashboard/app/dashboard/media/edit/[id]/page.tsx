import AddMediaForm from '@/components/form/testimonial/media/AddMediaForm'
import { Card, CardContent } from '@/components/ui/card'
import { getMediaById } from '@/externalAPI/medaiService'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

interface Props {
    params: {
        id: string
    }
}

export default async function page({ params }: Props) {
    const session = await getServerSession(authOptions);
    const token = session?.user.AccessToken as string;
    const { error, data } = await getMediaById(token, params.id)
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
                <h1 className="my-5 text-4xl font-semibold text-center">Edit Media</h1>
                <Card>
                    <CardContent>
                        <AddMediaForm action="edit" data={data} />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

