import React, { useEffect } from 'react';
import logo from './logo.svg';
import s from './App.module.scss';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm/RegisterForm';
import { Home } from './pages/Home/Home';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { refreshUser } from './redux/Slices/authSlice';
import { io } from 'socket.io-client';
import { BASE_URL } from './service/api/myApi';
import { socket } from './service/ws/socket';

function App() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshUser());
    // if (userData) {
    //   const connectHandler = () => {
    //     socket.emit('USER:ONLINE-TRUE', { userId: userData?._id });
    //   };
    //   const disconnectHandler = () => {
    //     socket.emit('USER:ONLINE-FALSE', { userId: userData?._id });
    //   };
    //   socket.on('connect', connectHandler);
    //   socket.on('disconnect', disconnectHandler);
    //   return () => {
    //     socket.off('connect', connectHandler);
    //     socket.off('disconnect', disconnectHandler);
    //   };
    // }
  }, []);
  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<AuthPage />}>
          <Route index element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        {isAuth && <Route path="/home" element={<Home />} />}
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </div>
  );
}

export default App;
