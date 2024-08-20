import { AddBlogForm } from '@/components/form/blog/AddBlogForm'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function page() {
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-5 md:mx-auto md:w-[80%]">
                <h1 className="my-5 text-4xl font-semibold text-center">Add Blogs</h1>
                <Card>
                    <CardContent>
                        <AddBlogForm action="add" />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

