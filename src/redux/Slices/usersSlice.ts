import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginData, UserData, registerData } from '../../types';
import API from '../../service/api/myApi';

export const getAllUsers = createAsyncThunk<
  { _id: string; fullName: string }[],
  void,
  { rejectValue: any }
>('users/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await API.getAllUsers();
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

enum errorStatues {
  error = 'error',
  ok = 'ok',
}
interface initalStateType {
  users: { _id: string; fullName: string }[] | null;
  errorStatus: null | errorStatues;
  errorMessage: null | any;
}
const initialState: initalStateType = {
  users: null,
  errorStatus: null,
  errorMessage: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.users = null;
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
      state.users = null;
      state.errorStatus = null;
      state.errorMessage = action.payload;
    });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
