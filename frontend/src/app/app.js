
import './index.css';




import { configureStore } from '@reduxjs/toolkit'

import adminReducer, { loadAdmin } from './features/AdminSlice';
import BlogsReducer, { getBlogs } from './features/BlogsSlice';
import CaseStudiesReducer, { getCaseStudies } from './features/CaseStudiesSlice';
import MediaReducer, { getMedia } from './features/MediaSlice';


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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
);
