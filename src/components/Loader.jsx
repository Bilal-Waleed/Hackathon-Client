import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Loader = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center min-h-screen backdrop-blur-sm bg-transparent">
      <div
        className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin ${
          isDark ? 'border-white border-t-white' : 'border-black border-t-black'
        }`}
      ></div>
    </div>
  );
};

export default Loader;
