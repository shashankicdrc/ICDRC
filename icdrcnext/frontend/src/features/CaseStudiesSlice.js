import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { url } from '../api';

const initialState = {
    data: [],
};

export const getCaseStudies = createAsyncThunk(
    "caseStudy/getCaseStudies",
    async () => {
        try {
            const res = await axios.get(`${url}/api/handlecasestudy`)
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

const CaseStudiesSlice = createSlice({
    name: 'caseStudy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCaseStudies.fulfilled, (state, action) => {
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

export default CaseStudiesSlice.reducer;