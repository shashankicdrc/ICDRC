

import { Rings } from 'react-loader-spinner';
import Image from 'next/image';

const PageLoader = () => {
    return (
        <div className='flex w-screen h-screen justify-center items-center bg-gray-800 flex-col'>
            <Image src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png" alt="logo" className="md:cursor-pointer w-44 md:w-1/3" width={50} height={50}
            />
            <Rings
                height="150"
                width="150"
                color="#f96702"
                // color="white"
                radius="8"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
            />
        </div>
    );
};

export default PageLoader;
