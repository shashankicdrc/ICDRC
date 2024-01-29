import React, { useEffect } from 'react'
import HomeNav from '../../components/Navbar/page';
import { useParams } from 'react-router-dom';
import Home7Contact from '../../components/HomeComponents/Home7Contact';
import Footer from './../../components/Footer/Footer';
import SocialIcons from '../../components/SocialIcons/page';
import './CaseStudies.css'
import { BallTriangle } from 'react-loader-spinner'
import { useState } from 'react';
import { url } from '../../app/api';
import axios from 'axios';

const CaseStudy = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${url}/api/handlecasestudy/${id}`);
                setData(res.data.data);
            }
            catch (err) {
                setError("Oops! Case Study not found.")
            }
            setLoading(false);
        }
        fetchBlog();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div style={{ overflowX: 'hidden' }}>

            <SocialIcons />
            <HomeNav />

            {/* Header Section */}
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '250px' }}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="flex h-full items-center justify-end flex-col">
                        <h2 className=" mb-4 md:mb-8 text-white text-xl font-[Caveat] text-center md:text-3xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                            The insurance claim settlement company that gets things done.
                        </h2>
                    </div>
                </div>
            </div>

            {loading ? <div className=' mt-6 flex justify-center items-center max-h-screen w-screen'>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="orange"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </div> : <>
                <div className="content_div border-2 bg-white border-gray-400 my-4 mx-4  md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
                    <h2 className='font-semibold text-xl md:text-3xl text-center font-[Roboto] pb-4 text-orange-600'>{data?.name}</h2>
                    <div className='content_div' style={{ overflowX: 'scroll' }} dangerouslySetInnerHTML={{ __html: data?.content }}>
                    </div>
                    {error?.length > 0 && <h2 className='font-semibold text-xl md:text-3xl text-center font-[Caveat] pb-4 text-orange-600'>{error}</h2>}
                </div >
            </>
            }

            <Home7Contact />
            <Footer />
        </div>
    )
}

export default CaseStudy