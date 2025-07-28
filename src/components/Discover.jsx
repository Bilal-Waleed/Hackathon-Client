import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Discover = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <section id="discover" className="py-20 mt-50 mb-50 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Discover Section</h2>
      <p className="text-lg">This is the Discover content rendered as a separate component.</p>
    </section>
  );
};

export default Discover;
