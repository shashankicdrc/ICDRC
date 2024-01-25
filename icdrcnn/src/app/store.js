"use client";


import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import BlogsReducer, { getBlogs } from '../features/page';


const store = configureStore({
    reducer: {
     
        blogs: BlogsReducer,
        
    }
});


store.dispatch(getBlogs(null));


export default store;
export const useAppDispatch = () => useDispatch();
