import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateMessageData, Dialog, Message, loginData, UserData, registerData } from '../../types';
import API from '../../service/api/myApi';

export const getUserMessages = createAsyncThunk<Message[], string, { rejectValue: any }>(
  'messages/getUserMessages',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.getMessageByDialogId(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const createMessage = createAsyncThunk<Message, CreateMessageData, { rejectValue: any }>(
  'messages/createMessage',
  async (params, { rejectWithValue }) => {
    try {
      const res = await API.createMessage(params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const deleteMessage = createAsyncThunk<string, string, { rejectValue: any }>(
  'messages/deleteMessage',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.deleteMessage(id);
      return id;
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
  messages: Message[] | null;
  errorStatus: null | errorStatues;
  errorMessage: null | any;
  isLoading: boolean;
}
const initialState: initalStateType = {
  messages: null,
  errorStatus: null,
  errorMessage: null,
  isLoading: true,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages?.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages?.filter((message) => message._id !== action.payload && message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMessage.pending, (state, action) => {
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.messages?.push(action.payload);
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(createMessage.rejected, (state, action: PayloadAction<any>) => {
      state.errorStatus = null;
      state.errorMessage = action.payload;
    });
    builder.addCase(getUserMessages.pending, (state, action) => {
      state.isLoading = true;
      state.messages = null;
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(getUserMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(getUserMessages.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.messages = null;
      state.errorStatus = null;
      state.errorMessage = action.payload;
    });
    builder.addCase(deleteMessage.pending, (state, action) => {
      state.isLoading = true;
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages =
        state.messages &&
        state.messages.filter((message) => message._id != action.payload && message);
      state.errorStatus = null;
      state.errorMessage = null;
    });
    builder.addCase(deleteMessage.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.errorStatus = null;
      state.errorMessage = action.payload;
    });
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
