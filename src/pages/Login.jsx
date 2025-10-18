import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import cookies from 'js-cookie';
import * as Yup from 'yup';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { showToast } from '../components/Toast';
import { CircularProgress } from '@mui/material';

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { theme } = useTheme();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      await loginSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      console.log(formData)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, formData);
      const {token, user} = response.data;
      cookies.set("token", token, {expires: 7});
      try { localStorage.setItem('token', token); } catch (_) {}
      console.log(user)
      setUser(user);
      showToast(response.data.message, 'success');
      navigate('/dashboard');
    } catch(error){ 
        if(error.name === 'ValidationError') {
          const validationErrors = {};
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
          });
          setErrors(validationErrors);
        } else {
          showToast(error.response?.data?.message || 'Login failed', 'error');
          if (error.response?.status === 401) {
            navigate('/otp', { state: { email: formData.email } });
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
          Welcome Back
        </h2>
        <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Login to your HealthMate account</p>
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
          <div className="text-right">
            <Link to="/forget-password" className={`text-sm ${isDark ? 'text-[#00cc88] hover:text-[#009966]' : 'text-[#009966] hover:text-[#00805a]'} transition`}>
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </button>
          <div className="flex items-center gap-2 mt-4">
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>or</span>
            <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
          </div>
          <p className={`text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link to="/register" className={`font-semibold ${isDark ? 'text-[#00cc88] hover:text-[#009966]' : 'text-[#009966] hover:text-[#00805a]'} transition`}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;