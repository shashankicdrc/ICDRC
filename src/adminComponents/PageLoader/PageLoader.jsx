import React from 'react'
import Loader from './../../components/Loader/Loader';

const PageLoader = () => {
    return (
        <div className='fixed h-screen w-screen bg-transparent bg-gray-100  z-50 flex justify-center items-center'>
            <Loader color="orange" h={40} w={40} />
        </div>
    )
}

export default PageLoader
