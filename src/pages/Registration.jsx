import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import * as Yup from 'yup';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { showToast } from '../components/Toast';
import { CircularProgress } from '@mui/material';

const registerSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  cnic: Yup.string().matches(/^\d{13}$/, 'CNIC must be 13 digits').required('CNIC is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Registration = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', cnic: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDark = theme === 'dark';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, formData);
      showToast(response.data.message, 'success');
      navigate('/otp', { state: { email: formData.email } });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        showToast(error.response?.data?.message || 'Registration failed', 'error');
        if (error.response?.status === 400) {
          navigate('/login');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-gray-50'} py-8 px-4`}>
      <div className={`w-full max-w-sm sm:max-w-md ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl p-8 border ${isDark ? 'border-[#009966] border-opacity-30' : 'border-[#009966] border-opacity-10'}`}>
        <h2 className={`text-3xl font-extrabold text-center mb-2 ${isDark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>
          Create Account
        </h2>
        <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Join HealthMate today</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black border-[#009966] border-opacity-30 text-white' : 'bg-gray-50 border-[#009966] border-opacity-20 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-[#009966]`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
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
          <div>
            <input
              type="text"
              name="cnic"
              placeholder="CNIC (13 digits)"
              value={formData.cnic}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black border-[#009966] border-opacity-30 text-white' : 'bg-gray-50 border-[#009966] border-opacity-20 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-[#009966]`}
            />
            {errors.cnic && <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>}
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black border-[#009966] border-opacity-30 text-white' : 'bg-gray-50 border-[#009966] border-opacity-20 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-[#009966]`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </button>
          <div className="flex items-center gap-2 mt-4">
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>or</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
          </div>
          <p className={`text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className={`font-semibold ${isDark ? 'text-[#00cc88] hover:text-[#009966]' : 'text-[#009966] hover:text-[#00805a]'} transition`}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;