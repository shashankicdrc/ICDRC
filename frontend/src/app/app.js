import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
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
    <Provider store={store}>
        <ChakraProvider>
            <Router>
                <App />
            </Router>
        </ChakraProvider>
    </Provider>
);
