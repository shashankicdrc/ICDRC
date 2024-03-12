'use client';
import React from 'react';
import { Oval } from 'react-loader-spinner';

// Define the PageLoader component
const PageLoader = () => {
    return (
        <div>
            {/* Render the loading spinner */}
            <Oval
                height="80"
                width="80"
                color="Black"
                
                visible={true}
                ariaLabel='oval-loading'
            />
            {/* Optionally, you can add a message */}
            <p>Loading...</p>
        </div>
    );
};

// Export the PageLoader component
export default PageLoader;
