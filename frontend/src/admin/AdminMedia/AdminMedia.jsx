import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../adminComponents/AdminNav/AdminNav'
import PageLoader from './../../adminComponents/PageLoader/PageLoader';
import { useEffect } from 'react';
import axios from 'axios';
import { url } from '../../api';
import { toast } from 'react-hot-toast';
import Item from '../../pages/Gallery/Item';

const AdminMedia = () => {
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!admin._id) {
      navigate('/en/ICDRC/loginAdmin')
    }
  }, [navigate, admin])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/handlemedia`)
      if (res.data.success) {
        setData(res.data.data);
      }
    }
    catch (err) {
      // console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/api/handlemedia`)
        if (res.data.success) {
          setData(res.data.data);
        }
      }
      catch (err) {
        // console.log(err);
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message);
        }
      }
      setLoading(false);
    }
    getData();
  }, [admin.token])

  const deletebtn = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/handlemedia/${id}`, {
        headers: {
          Authorization: admin.token,
          'Content-Type': 'application/json',
        }
      })
      if (res.data.success) {
        toast.success(res.data.message);
        getData();
      }
    }
    catch (err) {
      toast.error(err.response.data.message)
      // console.log(err);
    }
  }

  const HandleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let videoCode = '';
    if (video.length > 4) {
      videoCode = video.split('/')[3];
    }
    // console.log({ name, image, video: videoCode }); 
    try {
      const res = await axios.post(`${url}/api/handlemedia`, {
        name, image, video: videoCode
      }, {
        headers: {
          Authorization: admin.token,
          'Content-Type': 'application/json',
        }
      })
      if (res.data.success) {
        toast.success(res.data.message);
        setName('');
        setImage('');
        setVideo('');
      }
      getData();
    }
    catch (err) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      }
      if (err?.response?.statusText) {
        toast.error(err?.response?.statusText);
      }
    }
    setLoading(false);
  }

  return (
    <div className='bg-gradient-to-r from-orange-300 to-red-300 min-h-screen'>
      {loading && <PageLoader />}
      <AdminNav />

      <div
        className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '250px' }}>
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="flex h-full items-center justify-end flex-col">
            <h2 className=" mb-4 md:mb-8 text-white text-3xl text-center md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
              Manage Media
            </h2>
          </div>
        </div>
      </div>

      <div className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
        <h2 className="text-center border-b-2 border-gray-700 font-bold text-gray-900 text-3xl p-4">
          Add New Media
        </h2>

        <div className="flex flex-col justify-center items-center my-4">
          <form onSubmit={HandleSubmit} className="bg-white mb-4 w-4/5">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Title
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)} id="name" name='name' type="text" placeholder="Title" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image Url
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="url" value={image} required={true} onChange={(e) => setImage(e.target.value)} name='image' placeholder="Image Url" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
                Video Url
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={300} id="desc" name='desc' type="url" placeholder="Description" value={video} onChange={(e) => setVideo(e.target.value)} />
            </div>

            <div className="flex items-center justify-between">
              <button className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>


      </div >

      <div className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
        <h2 className="text-center border-b-2 border-gray-700 font-bold text-gray-900 text-3xl p-4">
          All Media
        </h2>
        <div className="grid gap-8 mt-5 md:mt-10 mx-4 md:mx-12 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {
            data?.length > 0 ?
              data.map((item) => (
                <Item key={item._id} image={item.image} video={item.video} name={item.name} deleteId={item._id} deletebtn={deletebtn} />
              ))
              :
              <span className='font-semibold font-[Caveat] text-xl md:text-2xl'>No Media available.</span>
          }
        </div>
      </div >

    </div >
  )
}

export default AdminMedia