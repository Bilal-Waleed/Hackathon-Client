import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToHash from './components/ScrollToHash';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
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
import Dashboard from './pages/Dashboard';
import UploadReport from './pages/UploadReport';
import ReportDetail from './pages/ReportDetail';
import Timeline from './pages/Timeline';
import Vitals from './pages/Vitals';
import Profile from './pages/Profile';

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
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadReport />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/vitals" element={<Vitals />} />
          <Route path="/profile" element={<Profile />} />
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