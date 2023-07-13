import axios from 'axios';
import { CreateMessageData, loginData, UserData, registerData } from '../../types';
export const BASE_URL = 'http://localhost:4444';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

const API = {
  registration: (data: registerData) => {
    return instance.post<UserData>('/register', data);
  },
  loginization: (data: loginData) => {
    return instance.post<UserData>('/login', data);
  },
  refresh: (accessToken: string | null) => {
    return instance.post<UserData>('/refresh', { accessToken });
  },
  getAllUsers: () => {
    return instance.get('/user/all');
  },
  getAllDialogs: () => {
    return instance.get('/dialog/all');
  },
  createDialog: (data: { _id: string }) => {
    return instance.post('/dialog/create', data);
  },
  getMessageByDialogId: (id: string) => {
    return instance.get(`messages/dialog/${id}`);
  },
  createMessage: (data: CreateMessageData) => {
    return instance.post('/message/create', data);
  },
  deleteMessage: (id: string) => {
    return instance.post('/message/delete', { id });
  },
  uploadImages: (files: any) => {
    return instance.post('/upload', files);
  },
};
export default API;
