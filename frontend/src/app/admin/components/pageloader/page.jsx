'use client';
import React from 'react';
import { Oval } from 'react-loader-spinner';

// Define the PageLoader component
const PageLoader = ({ height = 20, color = "black" }) => {
    return (
        <div>
            {/* Render the loading spinner */}
            <Oval
                height={height}
                width={height}
                color={color}
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
