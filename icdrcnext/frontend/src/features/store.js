


import { configureStore } from '@reduxjs/toolkit'

import adminReducer, { loadAdmin } from './AdminSlice'; 
import BlogsReducer, { getBlogs } from './BlogsSlice';
import CaseStudiesReducer, { getCaseStudies } from './CaseStudiesSlice';
import MediaReducer, { getMedia } from './MediaSlice';


const store = configureStore({
    reducer: {
        admin: adminReducer,
        blogs: BlogsReducer,
        casestudy: CaseStudiesReducer,
        media: MediaReducer,
    }
});
store.dispatch(loadAdmin(null));
store.dispatch(getBlogs(null));
store.dispatch(getCaseStudies(null));
store.dispatch(getMedia());

export default store;



