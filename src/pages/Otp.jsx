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
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'} py-8 px-4`}>
      <div className={`w-full max-w-sm sm:max-w-md bg-${isDark ? 'gray-800' : 'white'} rounded-lg shadow-lg p-8`}>
        <h2 className={`text-2xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
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
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;