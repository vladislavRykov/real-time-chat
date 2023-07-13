import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dialog, loginData, UserData, registerData, SelectedDialog } from '../../types';
import API from '../../service/api/myApi';

export const getAllDialogs = createAsyncThunk<Dialog[], void, { rejectValue: any }>(
  'dialog/getAllDialogs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.getAllDialogs();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const createDialog = createAsyncThunk<Dialog, string, { rejectValue: any }>(
  'dialog/createDialog',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.createDialog({ _id: id });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

enum errorStatues {
  error = 'error',
  ok = 'ok',
}
interface initalStateType {
  selectedDialog: SelectedDialog | null;
  dialogs: Dialog[] | null;
  errorStatus: null | errorStatues;
  errorMessage: null | any;
}
const initialState: initalStateType = {
  selectedDialog: null,
  dialogs: null,
  errorStatus: null,
  errorMessage: null,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.dialogs?.push(action.payload);
    },
    selectDialog: (state, action) => {
      state.selectedDialog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createDialog.pending, (state, action) => {
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(createDialog.fulfilled, (state, action) => {
      state.dialogs?.push(action.payload);
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(createDialog.rejected, (state, action: PayloadAction<any>) => {
      state.errorStatus = null;
      state.errorMessage = action.payload;
    });
    builder.addCase(getAllDialogs.pending, (state, action) => {
      state.dialogs = null;
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(getAllDialogs.fulfilled, (state, action) => {
      state.dialogs = action.payload;
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(getAllDialogs.rejected, (state, action: PayloadAction<any>) => {
      state.dialogs = null;
      state.errorStatus = null;
      state.errorMessage = action.payload;
    });
  },
});

export const { addNewMessage, selectDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
