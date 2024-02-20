import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';
import { url } from '../app/api';

export const initialState = {
  token: typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null,
  name: "",
  phoneNumber: "",
  email: '',
  country: '',
  state: '',
  city: '',
  address: '',
  language: '',
  policyCompany: '',
  policyType: '',
  problem: '',
  problemDetails: '',
  _id: '',
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (user) => {
    try {
      const res = await axios.post(`${url}/api/handleindividualcomplaint`, {
        email: user.email,
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
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);

        return {
          ...state,
          token,
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          country: user.country,
          state: user.state,
          city: user.city,
          address: user.address,
          language: user.language,
          policyCompany: user.policyCompany,
          policyType: user.policyType,
          problem: user.problem,
          problemDetails: user.problemDetails,
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
        phoneNumber: "",
        email: '',
        country: '',
        state: '',
        city: '',
        address: '',
        language: '',
        policyCompany: '',
        policyType: '',
        problem: '',
        problemDetails: '',
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
          phoneNumber: user.phoneNumber,
          email: user.email,
          country: user.country,
          state: user.state,
          city: user.city,
          address: user.address,
          language: user.language,
          policyCompany: user.policyCompany,
          policyType: user.policyType,
          problem: user.problem,
          problemDetails: user.problemDetails,
          _id: user._id,
        }
      }
      else {
        return state
      }
    });
  }
});

export const { loadUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
