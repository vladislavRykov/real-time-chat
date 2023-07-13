import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import usersReducer from './Slices/usersSlice';
import dialogReducer from './Slices/dialogSlice';
import messageReducer from './Slices/messagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    dialogsR: dialogReducer,
    messagesR: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
