import React from 'react';
import HomeNav from '../../../components/Navbar/page';
import Footer from '../../../components/footer/page';
import SocialIcons from '../../../components/SocialIcons/page';
import Styles from '../../../styles/Blogg.module.css';
import Image from 'next/image';
import { BASE_URL, httpStatus, httpStatusCode } from '../../../lib/constant';

export async function generateMetadata({ params }) {
    const response = await fetch(`${BASE_URL}/api/case-study/${params.id}`, {
        headers: {
            'Conent-Type': 'application/json',
        },
    });
    const { data } = await response.json();
    if (!data) {
        throw new Error('Case study does not exist.');
    }
    return {
        title: data.name,
        description: data.description,
        openGraph: {
            images: data.image,
        },
    };
}

export default async function page({ params }) {
    const id = params.id;
    const response = await fetch(`${BASE_URL}/api/case-study/${id}`, {
        headers: {
            'Conent-Type': 'application/json',
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (statusCode !== httpStatusCode.OK && status !== httpStatus.SUCCESS) {
        throw new Error(message);
    }
    return (
        <div style={{ overflowX: 'hidden' }}>
            <SocialIcons />
            <HomeNav />
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: '250px',
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div className="flex h-full items-center justify-end flex-col">
                        <h2 className=" mb-4 md:mb-8 text-white text-xl  md:text-3xl font-semibold">
                            {data.name}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="mx-5 my-5 md:mx-auto md:w-[70%]">
                <Image
                    src={data.image}
                    width={300}
                    height={200}
                    className="w-full rounded-md"
                    alt="Case Study Image"
                />
                <p className="text-sm text-muted-foreground my-2">
                    {data.description}
                </p>
                <div
                    className={Styles.content_div}
                    style={{ overflowX: 'scroll', marginTop: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />{' '}
            </div>
            <Footer />
        </div>
    );
}
