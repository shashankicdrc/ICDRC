'use client';
import { useEffect } from 'react';
import HomeNav from '../../components/Navbar/page';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import Link from 'next/link';

const MediationInfo = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <SocialIcons />
            <HomeNav />
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: '500px',
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div className="mt-6 md:mt-10 flex h-full items-center justify-start md:ml-12 ml-3">
                        <div className="text-white flex justify-start flex-col">
                            <h2
                                className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            >
                                Mediation Services
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1
                        className="text-gray-900 text-3xl md:text-5xl font-bold mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        What is Mediation?
                    </h1>
                    <p
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        Mediation is a structured, interactive process where an impartial third party assists disputing parties in resolving conflict through the use of specialized communication and negotiation techniques. All participants in mediation are encouraged to actively participate in the process. It is a voluntary, confidential, and cost-effective alternative to traditional litigation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    <div 
                        className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-500"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Virtual Mediation</h3>
                        <p className="text-gray-600 mb-6">
                            Experience the convenience and efficiency of our online mediation services. Virtual mediation allows parties to participate from the comfort of their own homes or offices, eliminating the need for travel. It utilizes secure video conferencing tools to facilitate face-to-face communication in a digital environment.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                            <li>Accessible from anywhere with an internet connection.</li>
                            <li>Saves time and travel expenses.</li>
                            <li>Secure and confidential platform.</li>
                            <li>Flexible scheduling options.</li>
                        </ul>
                        <Link href="/dashboard/mediation" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
                            Apply for Virtual Mediation
                        </Link>
                    </div>

                    <div 
                        className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Face to Face Mediation</h3>
                        <p className="text-gray-600 mb-6">
                            For those who prefer a traditional approach, our face-to-face mediation provides a neutral and comfortable physical setting for dispute resolution. This method allows for direct interpersonal communication and can be highly effective in resolving complex or deeply personal conflicts.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                            <li>Neutral, professional environment.</li>
                            <li>Direct, in-person communication.</li>
                            <li>Facilitates nuanced understanding of body language.</li>
                            <li>Dedicated time and space for focused resolution.</li>
                        </ul>
                        <Link href="/face-to-face-mediation" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
                            Learn More
                        </Link>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6" data-aos="fade-up">Why Choose ICDRC for Mediation?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 mb-8">
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100" data-aos="zoom-in" data-aos-delay="100">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Expert Mediators</h4>
                            <p className="text-gray-600">Our mediators are highly trained professionals with extensive experience in dispute resolution.</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100" data-aos="zoom-in" data-aos-delay="200">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Confidentiality</h4>
                            <p className="text-gray-600">We ensure strict confidentiality throughout the entire mediation process to protect your privacy.</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100" data-aos="zoom-in" data-aos-delay="300">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Cost-Effective</h4>
                            <p className="text-gray-600">Mediation is often significantly less expensive and faster than pursuing litigation in court.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-1 border-t my-5 w-full"></div>

            <Footer />
        </div>
    );
};

export default MediationInfo;
