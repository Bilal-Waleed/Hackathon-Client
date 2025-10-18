import React, { useState, useContext } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';
import {showToast} from '../components/Toast';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { User, setUser } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    showToast('success', 'Logged out successfully');
    cookies.remove('token');
    setUser(null);
    toggleSidebar();
  };

  const publicLinks = [
    { to: '/', label: 'Home', isHash: false },
    { to: '/services', label: 'Services', isHash: false },
    { to: '/about', label: 'About', isHash: false },
  ];

  const authLinks = [
    { to: '/dashboard', label: 'Dashboard', isHash: false },
    { to: '/upload', label: 'Upload', isHash: false },
    { to: '/timeline', label: 'Timeline', isHash: false },
    { to: '/vitals', label: 'Vitals', isHash: false },
    { to: '/profile', label: 'Profile', isHash: false },
  ];

  const navLinks = User ? [...publicLinks, ...authLinks] : publicLinks;

  const renderLink = (link) => {
    const isActive = link.isHash
      ? location.hash === '#discover'
      : location.pathname === link.to && location.hash === '';

    return link.isHash ? (
      <HashLink
        key={link.label}
        smooth
        to={link.to}
        className={`relative group pb-1 transition-colors ${
          isActive ? 'text-[#009966]' : (isDark ? 'text-white hover:text-[#00cc88]' : 'text-black hover:text-[#009966]')
        }`}
        onClick={toggleSidebar}
      >
        {link.label}
        <span
          className={`absolute left-0 -bottom-0 h-[2px] transition-all duration-300 bg-[#009966] ${
            isActive ? 'w-[50%]' : 'w-0 group-hover:w-[50%]'
          }`}
        />
      </HashLink>
    ) : (
      <Link
        key={link.label}
        to={link.to}
        onClick={toggleSidebar}
        className={`relative group pb-1 transition-colors ${
          isActive ? 'text-[#009966]' : (isDark ? 'text-white hover:text-[#00cc88]' : 'text-black hover:text-[#009966]')
        }`}
      >
        {link.label}
        <span
          className={`absolute left-0 -bottom-0 h-[2px] transition-all duration-300 bg-[#009966] ${
            isActive ? 'w-[50%]' : 'w-0 group-hover:w-[50%]'
          }`}
        />
      </Link>
    );
  };

  return (
    <>
      <nav className={`w-full px-4 py-4 border-b ${isDark ? 'bg-black border-[#009966] border-opacity-30' : 'bg-white border-[#009966] border-opacity-20'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className={`text-2xl font-extrabold ${isDark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>
            HealthMate
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map(renderLink)}
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className={`focus:outline-none p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-900 text-[#00cc88]' : 'hover:bg-gray-100 text-[#009966]'}`}>
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {!User ? (
              <Link
                to="/register"
                className={`hidden md:block px-5 py-2 rounded-lg font-semibold transition ${
                  isDark
                    ? 'bg-[#009966] hover:bg-[#00805a] text-white'
                    : 'bg-[#009966] hover:bg-[#00805a] text-white'
                }`}
              >
                Sign Up
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className={`hidden md:block px-5 py-2 rounded-lg font-semibold border transition ${
                  isDark
                    ? 'border-[#009966] text-[#00cc88] hover:bg-[#009966] hover:bg-opacity-10'
                    : 'border-[#009966] text-[#009966] hover:bg-[#009966] hover:bg-opacity-5'
                }`}
              >
                Logout
              </button>
            )}

            <button className="md:hidden focus:outline-none" onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <FiX className={`text-2xl ${isDark ? 'text-white' : 'text-black'}`} />
              ) : (
                <FiMenu className={`text-2xl ${isDark ? 'text-white' : 'text-black'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-64 border-l ${
          isDark ? 'bg-black border-[#009966] border-opacity-30' : 'bg-white border-[#009966] border-opacity-20'
        } shadow-2xl transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden z-50`}
      >
        <div className="flex flex-col p-4 space-y-4 mt-16">
          {navLinks.map(renderLink)}
          {!User ? (
            <Link
              to="/register"
              onClick={toggleSidebar}
              className={`px-5 py-2 rounded-lg font-semibold text-center transition ${
                isDark
                  ? 'bg-[#009966] hover:bg-[#00805a] text-white'
                  : 'bg-[#009966] hover:bg-[#00805a] text-white'
              }`}
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className={`px-5 py-2 rounded-lg font-semibold border text-center transition ${
                isDark
                  ? 'border-[#009966] text-[#00cc88] hover:bg-[#009966] hover:bg-opacity-10'
                  : 'border-[#009966] text-[#009966] hover:bg-[#009966] hover:bg-opacity-5'
              }`}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 md:hidden z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
