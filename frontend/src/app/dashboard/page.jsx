import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/authOptions'

export default async function page() {
    const session = await getServerSession(authOptions)
    return (
        <div>
            Dashboard page {session.user.name}
        </div>
    )
}

