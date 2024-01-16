import { Route, Routes } from 'react-router-dom';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import { useEffect } from 'react';
import { lazy, Suspense } from 'react'
import PageLoader from './components/PageLoader/PageLoader';

const Home = lazy(() => import('./pages/Home/Home'));
const Register = lazy(() => import('./pages/Register/Register'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Partner = lazy(() => import('./pages/Partner/Partner'));
const About = lazy(() => import('./pages/About/About'));
const LoginAdmin = lazy(() => import('./admin/LoginAdmin/LoginAdmin'))
const HomeAdmin = lazy(() => import('./admin/HomeAdmin/HomeAdmin'))
const ChatBotLeads = lazy(() => import('./admin/ChatBotLeads/ChatBotLeads'))
const ContactMessages = lazy(() => import('./admin/ContactMessages/ContactMessages'))
const PartnerData = lazy(() => import('./admin/PartnerData/PartnerData'))
const Newsletter = lazy(() => import('./admin/Newsletter/Newsletter'));
const AdminBlog = lazy(() => import('./admin/AdminBlogs/AdminBlog'));
const AdminCaseStudy = lazy(() => import('./admin/AdminCaseStudy/AdminCaseStudy'));
const Blog = lazy(() => import('./pages/Blogs/Blog'));
const Blogs = lazy(() => import('./pages/Blogs/Blogs'));
const CaseStudies = lazy(() => import('./pages/CaseStudys/CaseStudies'));
const CaseStudy = lazy(() => import('./pages/CaseStudys/CaseStudy'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const AdminMedia = lazy(() => import('./admin/AdminMedia/AdminMedia'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="App">
      <Suspense fallback={<PageLoader />}>
        <Toaster />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/partner' element={<Partner />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/blogs' element={<Blogs />} />
          <Route exact path='/blogs/:id' element={<Blog />} />
          <Route exact path='/casestudies' element={<CaseStudies />} />
          <Route exact path='/casestudies/:id' element={<CaseStudy />} />
          <Route exact path='/gallery' element={< Gallery />} />
          {/* Admin Routes */}
          <Route exact path='/en/ICDRC/loginAdmin' element={<LoginAdmin />} />
          <Route exact path='/en/ICDRC/Home' element={<HomeAdmin />} />
          <Route exact path='/en/ICDRC/chatbotleads' element={<ChatBotLeads />} />
          <Route exact path='/en/ICDRC/contactmessages' element={<ContactMessages />} />
          <Route exact path='/en/ICDRC/partnerdata' element={<PartnerData />} />
          <Route exact path='/en/ICDRC/newsletterdata' element={<Newsletter />} />
          <Route exact path='/en/ICDRC/manageblogs' element={<AdminBlog />} />
          <Route exact path='/en/ICDRC/managecasestudies' element={<AdminCaseStudy />} />
          <Route exact path='/en/ICDRC/admingallery' element={<AdminMedia />} />
          {/* <Route exact path='/register2' element={<PageLoader />} /> */}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
