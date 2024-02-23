import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { url } from '../app/api';

const initialState = {
    data: [],
};

export const getBlogs = createAsyncThunk(
    "blogs/getBlogs",
    async() => {
        try {
            const res = await axios.get(`${url}/api/handleblogs`)
            if (res.data.success) {
                return res.data.data;
            }
        }
        catch (err) {
            if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message);
            }
        }
    }
)

const blogsSlice = createSlice({
    name:'blogs',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getBlogs.fulfilled, (state,action) => {
            if(action.payload){
                return {
                    ...state,
                    data: action.payload
                }
            }
            else{
                return state;
            }
        })
    }
})

export default blogsSlice.reducer;