import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';
import { url } from '../app/api';

export const initialState = {
  token: typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null,
  name: "",
  emailId: '',

  _id: '',
};

export const loginUser = createAsyncThunk(
    "User/login",
    async (user) => {
        try {
            const res = await axios.post(`${url}/api/loginuser`, {
                emailId: user.email,
                password: user.password
            });
            if (res.data.success) {
                toast.success(res.data.message)
                sessionStorage.setItem('token', res.data.token);
            }
            else {
                toast.error("Login Failed, Invalid Credentials")
                return;
            }

            return res.data.token;
        } catch (error) {
            toast.error("Login Failed, Invalid Credentials")
        }
    }
)

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token

            if (token) {
                const user = jwtDecode(token);

                return {
                    ...state,
                    token,
                    name: user.name,
                    emailId: user.emailId,
                    _id: user._id,

                };
            }
        },
        logoutUser(state, action) {
            sessionStorage.removeItem('token');

            return {
                ...state,
                token: "",
                name: "",
                emailId: '',
                _id: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    emailId: user.emailId,
                    _id: user._id,
                    
                }
            }
            else {
                return state
            }
        });
    }
});

export const { loadUser, logoutUser } = UserSlice.actions
export default UserSlice.reducer