import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { url } from '../app/api';

const initialState = {
    data: [],
};

export const getMedia = createAsyncThunk(
    "media/getMedia",
    async () => {
        try {
            const res = await axios.get(`${url}/api/handlemedia`)
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

const MediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMedia.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    data: action.payload
                }
            }
            else {
                return state;
            }
        })
    }
})

export default MediaSlice.reducer;