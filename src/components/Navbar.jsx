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

  const navLinks = [
    { to: '/', label: 'Home', isHash: false },
    { to: '/#discover', label: 'Discover', isHash: true },
    { to: '/services', label: 'Services', isHash: false },
  ];

  const renderLink = (link) => {
    const isActive = link.isHash
      ? location.hash === '#discover'
      : location.pathname === link.to && location.hash === '';

    return link.isHash ? (
      <HashLink
        key={link.label}
        smooth
        to={link.to}
        onClick={toggleSidebar}
        className={`relative group font-medium text-lg transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        } inline-block`}
      >
        {link.label}
        <span
          className={`absolute left-0 -bottom-0 h-[2px] transition-all duration-300 ${
            isDark ? 'bg-white' : 'bg-black'
          } ${isActive ? 'w-[50%]' : 'w-0 group-hover:w-[50%]'}`}
        />
      </HashLink>
    ) : (
      <Link
        key={link.label}
        to={link.to}
        onClick={toggleSidebar}
        className={`relative group font-medium text-lg transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        } inline-block`}
      >
        {link.label}
        <span
          className={`absolute left-0 -bottom-0 h-[2px] transition-all duration-300 ${
            isDark ? 'bg-white' : 'bg-black'
          } ${isActive ? 'w-[50%]' : 'w-0 group-hover:w-[50%]'}`}
        />
      </Link>
    );
  };

  return (
    <>
      <nav className={`w-full px-4 py-3 shadow-md ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            My App
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map(renderLink)}
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="focus:outline-none">
              {isDark ? <FiSun className="text-white" /> : <FiMoon className="text-black" />}
            </button>

            {!User ? (
              <Link
                to="/register"
                className={`hidden md:block px-4 py-1 rounded-2xl font-medium border ${
                  isDark
                    ? 'text-white border-white hover:bg-white hover:text-black'
                    : 'text-black border-black hover:bg-black hover:text-white'
                } transition-all duration-300`}
              >
                Sign Up
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className={`hidden md:block px-4 py-1 rounded-2xl font-medium border ${
                  isDark
                    ? 'text-white border-white hover:bg-white hover:text-black'
                    : 'text-black border-black hover:bg-black hover:text-white'
                } transition-all duration-300`}
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
        className={`fixed top-0 right-0 h-full w-64 ${
          isDark ? 'bg-gray-900' : 'bg-white'
        } shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden z-50`}
      >
        <div className="flex flex-col p-4 space-y-4 mt-16">
          {navLinks.map(renderLink)}
          {!User ? (
            <Link
              to="/register"
              onClick={toggleSidebar}
              className={`px-4 py-1 rounded-2xl font-medium border text-center ${
                isDark
                  ? 'text-white border-white hover:bg-white hover:text-black'
                  : 'text-black border-black hover:bg-black hover:text-white'
              } transition-all duration-300`}
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className={`px-4 py-1 rounded-2xl font-medium border text-center ${
                isDark
                  ? 'text-white border-white hover:bg-white hover:text-black'
                  : 'text-black border-black hover:bg-black hover:text-white'
              } transition-all duration-300`}
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
