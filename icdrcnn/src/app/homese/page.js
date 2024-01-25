'use client';
 







import Home1 from '../../components/HomeComponents/Home1/page';
// import Navbar from '../../components/Navbar/HomeNav';
import Home2 from '../../components/HomeComponents/Home2';
import Home3 from '../../components/HomeComponents/Home3';
// import Home4 from '../../components/HomeComponents/Home4/Home4';
// import Home5 from '../../components/HomeComponents/Home5/Home5';
// import Home6 from '../../components/HomeComponents/Home6/Home6';
// import Testimonial from '../../components/HomeComponents/Testimonials/Testimonial';
// import Home7Contact from '../../components/HomeComponents/Home7Contact/Home7Contact';
import Footer from '../../components/footer/page';
// import SocialIcons from '../../components/SocialIcons/SocialIcons';
// import Testimonials from '../../components/HomeComponents/Testimonials/Testimonial';

const Home = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [])
  return (
    <div>
      {/* <SocialIcons />*/}
      {/* <Navbar />  */}
      <Home1 />
      <Home2 />
       <Home3 />
     {/* <Home4 />
      <Home5 /> */}
      {/* <Home6 /> */}
      
      {/* <Home7Contact /> */}
      {/* <Testimonials /> */}
      
      <Footer />
    </div>
  )
}

export default Home