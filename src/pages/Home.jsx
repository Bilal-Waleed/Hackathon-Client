import React from 'react';
import Discover from '../components/Discover';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <div>
      <section className="py-20 mt-50 mb-50 px-4">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <p className="mt-4 text-lg">This is the home section.</p>
      </section>

      <Discover />
    </div>
  );
};

export default Home;
