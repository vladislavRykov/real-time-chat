import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginData, UserData, registerData, ErrorInfo } from '../../types';
import API from '../../service/api/myApi';
import { bind } from 'lodash';
import { AxiosError, AxiosResponse } from 'axios';

export const registerUser = createAsyncThunk<UserData, registerData, { rejectValue: ErrorInfo }>(
  'auth/registerUser',
  async (params, { rejectWithValue }) => {
    try {
      const res = await API.registration(params);
      localStorage.setItem('token', res.data.accessToken);
      return res.data;
    } catch (error) {
      const errors = error as AxiosError<ErrorInfo>;
      const response = errors.response as AxiosResponse<ErrorInfo, any>;
      return rejectWithValue(response.data);
    }
  },
);
export const loginUser = createAsyncThunk<UserData, loginData, { rejectValue: ErrorInfo }>(
  'auth/loginUser',
  async (params, { rejectWithValue }) => {
    try {
      const res = await API.loginization(params);
      localStorage.setItem('token', res.data.accessToken);
      return res.data;
    } catch (error) {
      const errors = error as AxiosError<ErrorInfo>;
      const response = errors.response as AxiosResponse<ErrorInfo, any>;
      return rejectWithValue(response.data);
    }
  },
);
export const refreshUser = createAsyncThunk<UserData, void, { rejectValue: ErrorInfo }>(
  'auth/refreshUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.refresh(localStorage.getItem('token'));
      localStorage.setItem('token', res.data.accessToken);
      return res.data;
    } catch (error) {
      const errors = error as AxiosError<ErrorInfo>;
      const response = errors.response as AxiosResponse<ErrorInfo, any>;
      return rejectWithValue(response.data);
    }
  },
);
export const logoutUser = createAsyncThunk<void, void>('auth/logoutUser', async (_) => {
  localStorage.removeItem('token');
});

export enum errorStatues {
  error = 'error',
  ok = 'ok',
}
interface initalStateType {
  isAuth: boolean;
  userData: UserData | null;
  errorInfo: ErrorInfo | null;
}
const initialState: initalStateType = {
  isAuth: false,
  userData: null,
  errorInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isAuth = false;
      state.userData = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userData = action.payload;
      state.errorInfo = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuth = false;
      state.userData = null;
      state.errorInfo = action.payload ? action.payload : null;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isAuth = false;
      state.userData = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userData = action.payload;
      state.errorInfo = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuth = false;
      state.userData = null;
      state.errorInfo = action.payload ? action.payload : null;
    });
    builder.addCase(refreshUser.pending, (state, action) => {
      state.isAuth = false;
      state.userData = null;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userData = action.payload;
      state.errorInfo = null;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.isAuth = false;
      state.userData = null;
      state.errorInfo = action.payload ? action.payload : null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isAuth = false;
      state.userData = null;
      state.errorInfo = null;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
