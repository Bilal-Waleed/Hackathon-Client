import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import * as Yup from 'yup';
import axios from 'axios';
import { showToast } from '../components/Toast';
import {CircularProgress} from '@mui/material';


const forgetPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isDark = theme === 'dark';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgetPasswordSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forget-password`, formData);
      showToast(response.data.message, 'success');
      navigate('/login');
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        showToast(error.response?.data?.message || 'Password reset request failed', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-gray-50'} py-8 px-4`}>
      <div className={`w-full max-w-sm sm:max-w-md ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl p-8 border ${isDark ? 'border-[#009966] border-opacity-30' : 'border-[#009966] border-opacity-10'}`}>
        <h2 className={`text-3xl font-extrabold text-center mb-2 ${isDark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>
          Forgot Password
        </h2>
        <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black border-[#009966] border-opacity-30 text-white' : 'bg-gray-50 border-[#009966] border-opacity-20 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-[#009966]`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}
          >
            {loading ? <CircularProgress size={24} color="inherit" />: 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;