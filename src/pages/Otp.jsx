import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import * as Yup from 'yup';
import axios from 'axios';
import { showToast } from '../components/Toast';
import { CircularProgress } from '@mui/material';

const otpSchema = Yup.object({
  otp: Yup.string().matches(/^\d{4}$/, 'OTP must be 4 digits').required('OTP is required'),
});

const Otp = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [formData, setFormData] = useState({ otp: '' });
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
      await otpSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-otp`, { email, otp: formData.otp });
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
        showToast(error.response?.data?.message || 'OTP verification failed', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-gray-50'} py-8 px-4`}>
      <div className={`w-full max-w-sm sm:max-w-md ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl p-8 border ${isDark ? 'border-[#009966] border-opacity-30' : 'border-[#009966] border-opacity-10'}`}>
        <h2 className={`text-3xl font-extrabold text-center mb-2 ${isDark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>
          Verify OTP
        </h2>
        <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Enter the 4-digit OTP sent to {email || 'your email'}.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black border-[#009966] border-opacity-30 text-white' : 'bg-gray-50 border-[#009966] border-opacity-20 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-[#009966]`}
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;