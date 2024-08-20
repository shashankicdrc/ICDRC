import { AddBlogForm } from '@/components/form/blog/AddBlogForm'
import { Card, CardContent } from '@/components/ui/card'
import { getBlogById } from '@/externalAPI/blogSerice'
import React from 'react'

interface Props {
    params: {
        id: string
    }
}

export default async function page({ params }: Props) {
    const { error, data } = await getBlogById(params.id)
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
                <h1 className="my-5 text-4xl font-semibold text-center">Add Blogs</h1>
                <Card>
                    <CardContent>
                        <AddBlogForm action="edit" data={data} />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

