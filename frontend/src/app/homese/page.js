'use client';
import { useEffect } from 'react';

import Home1 from '../../components/HomeComponents/Home1/page';
import Navbar from '../../components/Navbar/page';
import Home2 from '../../components/HomeComponents/Home2';
import Home3 from '../../components/HomeComponents/Home3';
import Home4 from '../../components/HomeComponents/Home4';
import Home5 from '../../components/HomeComponents/Home5';
import Testimonial from '../../components/HomeComponents/Testimonials/page';
import Home7Contact from '../../components/HomeComponents/Home7Contact';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';



const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <SocialIcons />
            <Navbar isWhiteBg={true} />
            <Home1 />
            <Home2 />
            <Home3 />
            <Home4 />
            <Home5 />
            <Testimonial />
            <Home7Contact />
            <Footer />
        </div>
    )
}

export default Home
