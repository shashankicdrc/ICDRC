'use client';
import { useEffect } from 'react';
import HomeNav from '../../components/Navbar/page';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import { ImLocation2 } from 'react-icons/im';
import { MdEmail, MdPhone } from 'react-icons/md';
import { BsClock } from 'react-icons/bs';

const FaceToFaceMediation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <SocialIcons />
            <HomeNav />

            {/* Hero Banner */}
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
                                Face to Face Mediation
                            </h2>
                            <p
                                className="text-lg text-gray-200 text-start px-4 max-w-2xl"
                                data-aos="fade-up"
                                data-aos-duration="2500"
                            >
                                Visit us in person for a professional, confidential mediation experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1
                        className="text-gray-900 text-3xl md:text-5xl font-bold mb-4"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        Visit Our Office
                    </h1>
                    <p
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        For face-to-face mediation, please visit us at our office. Our team of expert mediators is ready to assist you in resolving your disputes in a neutral, professional environment.
                    </p>
                </div>

                {/* Address Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    {/* Corporate Office */}
                    <div
                        className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-500"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-100 p-3 rounded-full">
                                <ImLocation2 size={28} className="text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800">Corporate Office</h3>
                        </div>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            6th Floor, Sanatan Building,<br />
                            Opposite CAG Office,<br />
                            Deendayal Upadhyay Marg,<br />
                            New Delhi
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-600">
                                <MdPhone size={20} className="text-orange-500" />
                                <span>+91-11-4102 3725</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MdEmail size={20} className="text-orange-500" />
                                <span>info@icdrc.in</span>
                            </div>
                            {/* <div className="flex items-center gap-3 text-gray-600">
                                <BsClock size={18} className="text-orange-500" />
                                <span>Mon - Sat: 10:00 AM - 6:00 PM</span>
                            </div> */}
                        </div>

                        <a
                            href="https://maps.google.com/?q=Sanatan+Building+Deendayal+Upadhyay+Marg+New+Delhi"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                        >
                            Get Directions
                        </a>
                    </div>

                    {/* Registered Office */}
                    <div
                        className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <ImLocation2 size={28} className="text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800">Registered Office</h3>
                        </div>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            A-62, Basement,<br />
                            DDA Shed Industrial Area Phase II,<br />
                            Okhla Industrial Estate,<br />
                            New Delhi - 110020, India
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-600">
                                <MdPhone size={20} className="text-blue-500" />
                                <span>+91-11-4102 3725</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MdEmail size={20} className="text-blue-500" />
                                <span>info@icdrc.in</span>
                            </div>
                            {/* <div className="flex items-center gap-3 text-gray-600">
                                <BsClock size={18} className="text-blue-500" />
                                <span>Mon - Sat: 10:00 AM - 6:00 PM</span>
                            </div> */}
                        </div>

                        <a
                            href="https://maps.google.com/?q=A-62+Okhla+Industrial+Estate+New+Delhi+110020"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                        >
                            Get Directions
                        </a>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6" data-aos="fade-up">
                        What to Expect
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 mb-8">
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100" data-aos="zoom-in" data-aos-delay="100">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Professional Setting</h4>
                            <p className="text-gray-600">
                                Our offices provide a neutral, comfortable, and professional environment for all mediation sessions.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100" data-aos="zoom-in" data-aos-delay="200">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Expert Mediators</h4>
                            <p className="text-gray-600">
                                Highly trained mediators will guide you through the process with expertise and impartiality.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100" data-aos="zoom-in" data-aos-delay="300">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Confidential Process</h4>
                            <p className="text-gray-600">
                                All discussions and information shared during mediation remain strictly confidential.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-1 border-t my-5 w-full"></div>

            <Footer />
        </div>
    );
};

export default FaceToFaceMediation;
