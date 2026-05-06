'use client';
import Home1 from '../../components/HomeComponents/Home1/page';
import Navbar from '../../components/Navbar/page';
import Home2 from '../../components/HomeComponents/Home2';
import Home3 from '../../components/HomeComponents/Home3';
import Home4 from '../../components/HomeComponents/Home4';
import Home5 from '../../components/HomeComponents/Home5';
import Testimonial from '../../components/HomeComponents/Testimonials/page';
// import Home7Contact from '../../components/HomeComponents/Home7Contact';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import PricingCard from '../../components/HomeComponents/PricingCard';
import { ReviewTestimonial } from '../../components/HomeComponents/ReviewTestimonial';
import TotalSubscription from '@/components/HomeComponents/TotalSubscription';

const Home = () => {
    return (
        <div>
            <SocialIcons />
            <Navbar isWhiteBg={true} />
            <Home1 />
            <TotalSubscription />
            <Home3 />
            <Home2 />
            <Home5 />
            <Home4 />
            <PricingCard />
            <ReviewTestimonial />
            <Testimonial />
            {/* <Home7Contact /> */}
            <Footer />
        </div>
    );
};

export default Home;
