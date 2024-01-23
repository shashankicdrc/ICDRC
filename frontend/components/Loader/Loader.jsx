import React from 'react'

import { Oval } from 'react-loader-spinner'

const Loader = ({ h, color }) => {
    return (
        <Oval
            height={h || 20}
            width={h || 20}
            color={color || "black"}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor={color || "black"}
            strokeWidth={6}
            strokeWidthSecondary={8}
        />
    )
}

export default Loader;