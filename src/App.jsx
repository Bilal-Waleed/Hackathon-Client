import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToHash from './components/ScrollToHash';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Otp from './pages/Otp';
import ForgetPassword from './pages/Forget-password';
import ResetPassword from './pages/Reset-password';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import { ProtectedRoutes, RestrictedRoutes } from './components/ProtectedRoutes';
import AdminRoutes from './components/AdminRoutes';
import AdminServices from './pages/AdminPages/AdminServices';

const App = () => {
  const { User } = useContext(AuthContext);

  if(User) console.log(User);

  return (
    <>
      <ToastProvider />
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/services" element={<Services />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/admin/services" element={<AdminServices />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;