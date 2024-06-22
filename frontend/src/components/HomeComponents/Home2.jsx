import Image from "next/image";

const Home2 = () => {
    return (
        <>
            <div className="my-8 md:py-12">
                <h1
                    className="text-3xl md:text-6xl font-[Roboto] font-bold text-center px-8"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    Areas We Cover
                </h1>
                <p
                    className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    At ICDRC, we expertly handle a wide range of insurance disputes, ensuring you receive the support you need.                </p>

                <div className="grid gap-10 my-10 md:my-16  mx-auto px-4  grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Life Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Life Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="100"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Health Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Health Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="300"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm"
                            src="/images/insurance/Motor Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Motor Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="500"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Travel Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Travel Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="700"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Crop Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Crop Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="900"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Fire Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Fire Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="1100"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Marine Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Marine Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="1300"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Liability Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Liability Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="1500"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src='/images/insurance/Cyber Insurance.webp'
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Cyber Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="1700"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src='/images/insurance/Personal Accident Insurance.webp'
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Personal Accident Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="1900"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Property Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Property Insurance
                        </p>
                    </div>

                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="2100"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "

                            src="/images/insurance/Event Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Event Insurance
                        </p>
                    </div>

                </div>
                <div className="flex items-center  justify-center">
                    <div
                        className="flex flex-col items-center"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-delay="500"
                    >
                        <Image
                            className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm "
                            src="/images/insurance/Professional Indemnity Insurance.webp"
                            alt="Person"
                            width={80}
                            height={80}
                        />
                        <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                            Professional Indemnity Insurance
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home2;
