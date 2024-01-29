'use client';
import React, { useEffect } from 'react'
import HomeNav from '../../components/Navbar/page';
import Home7Contact from '../../components/HomeComponents/Home7Contact';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import Item from './Item';
import { useSelector } from 'react-redux';


const Gallery = () => {

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [])

    // const media = useSelector((state) => state.media)

    const media = [
        {
            _id: '1',
            image: 'https://dummyimage.com/400x300',
            video: 'Dummy video1',
        }
    ];

    return (
        <div>
            <SocialIcons />
            <HomeNav />


{/* 
            <Helmet>
        <meta charSet="utf-8" />
        <title>ICDRC: Gallery</title>
        <link rel="canonical" href="" />
        <meta
          name="description"
          content="Explore captivating images capturing moments of success, teamwork, and client satisfaction. Witness our commitment to transparent processes and empowering individuals in their insurance claim experiences. "
        />
        <meta
          name="keywords"
          content="reliable insurance solutions, Our Success stories, ICDRC, successful claims, Insurance recovery, ICDRC official Claim advocates, Fast insurance settlements, InsuranceSamadhan Alternative"
        />
      </Helmet> */}

            {/* Header Section */}
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '250px' }}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="flex h-full items-center justify-end flex-col">
                        <h2 className=" mb-4 md:mb-8 text-white text-xl font-[Caveat] text-center md:text-3xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                            Our Gallery
                        </h2>
                    </div>
                </div>
            </div>

            <div className=" bg-white my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
                <div className="grid gap-8 mt-5 md:mt-10 mx-4 md:mx-12 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                    {
                        media.data?.length > 0 ?
                            media.data.map((item) => (
                                <Item key={item._id} image={item.image} video={item.video} name={item.name} />
                            ))
                            :
                            <span className='font-semibold font-[Caveat] text-xl md:text-2xl'>No Media available.</span>
                    }
                </div>
            </div >

            <Home7Contact />
            <Footer />
        </div>
    )
}

export default Gallery