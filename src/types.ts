import { errorStatues } from './redux/Slices/authSlice';

export interface loginData {
  email: string;
  password: string;
}
export interface registerData {
  email: string;
  password: string;
  fullName: string;
}
export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar: String;
  confirmed?: boolean;
  confirm_hash?: string;
  last_seen: Date;
  isOnline: boolean;
  accessToken: string;
}
export interface Dialog {
  _id: string;
  lastMessage: null | Message;
  createdAt: string;
  updatedAt: string;
  partner: Partner;
}
export interface DialogBack {
  _id: string;
  members: string[];
  lastMessage: null | Message;
  createdAt: string;
  updatedAt: string;
}
export interface File {
  _id: string;
  fileName: string;
  source: string;
  size: number;
  mimetype: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
export interface Message {
  _id: string;
  author: UserData;
  text: string;
  dialog: string | DialogBack;
  isMe?: boolean;
  unread: boolean;
  attachments: File[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageData {
  text: string;
  dialog: string;
  attachments: null | string[];
}
export interface Partner {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  last_seen: string;
  isOnline: boolean;
}
export interface SelectedDialog {
  _id: string;
  partner: Partner;
}
export interface ErrorInfo {
  status: errorStatues;
  errorMessage: string;
  errorsArray: null | any[];
}
