import React from 'react';
import HomeNav from '../../components/Navbar/page';
import Link from 'next/link';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import Image from 'next/image';
import PaginationComponent from '../../components/PaginationController';
import PerRowSelect from '../../components/PerRowSelect';
import { getBlogs } from '../../externalAPI/blogService';
import { BASE_URL } from '../../lib/constant';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

export const metadata = {
    title: 'Case Study',
};

export default async function page({ searchParams }) {
    let page = Number(searchParams.page || 1);
    let perRow = Number(searchParams.perRow || 20);

    const url = `${BASE_URL}/api/case-study?page=${page}&perRow=${perRow}&sortBy=desc(createdAt)`;
    const { error, data } = await getBlogs(url);
    return (
        <div>
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
                    <div className="flex h-full blogs-center justify-end flex-col">
                        <h2
                            className=" mb-4 md:mb-8 capitalize text-white text-3xl text-center md:text-6xl font-semibold"
                            data-aos="fade-up"
                            data-aos-duration="2000"
                        >
                            Case Study
                        </h2>
                    </div>
                </div>
            </div>

            <div className="">
                <div
                    className="grid gap-8 mt-5 md:mt-10 mx-5 md:mx-10 lg:grid-cols-3
                    sm:max-w-sm sm:mx-auto lg:max-w-full"
                >
                    {error && (
                        <div className="flex  justify-center">
                            <p className="text-destructive">{error}</p>
                        </div>
                    )}
                    {!error && data.caseStudy.length > 0 ? (
                        data.caseStudy.map((blog) => (
                            <div
                                key={blog.slug}
                                className="overflow-hidden border
                                 bg-white rounded-md shadow-md"
                            >
                                <Link
                                    href={`/casestudies/${blog.slug}`}
                                    aria-label="Article"
                                >
                                    <AspectRatio.Root ratio={16 / 9}>
                                        <Image
                                            src={blog.image}
                                            className="w-full h-full rounded-t-md"
                                            alt="Blog Image"
                                            width={640}
                                            height={360}
                                        />
                                    </AspectRatio.Root>
                                </Link>
                                <div className="py-5 px-5">
                                    <Link
                                        href={`/casestudies/${blog.slug}`}
                                        aria-label="Article"
                                    >
                                        <p className="text-xl">{blog.name}</p>

                                        <p className="mb-4 text-muted-foreground text-sm">
                                            {blog.description}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="md:mx-auto md:w-1/2  col-span-3">
                            <p className="text-2xl font-bold text-center">
                                No case study found
                            </p>
                        </div>
                    )}
                </div>
                <div className="my-5 mx-5 md:mx-10 flex justify-between items-center">
                    {data.totalCount > 10 && (
                        <div className="flex space-x-2 justify-center items-center">
                            <p className="font-bold text-sm">Rows per page</p>
                            <PerRowSelect />
                        </div>
                    )}
                    {data.totalCount > perRow && (
                        <div>
                            <PaginationComponent
                                totalResults={data.totalCount}
                            />
                        </div>
                    )}{' '}
                </div>
            </div>
            <Footer />
        </div>
    );
}
