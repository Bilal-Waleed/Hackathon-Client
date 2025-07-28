import React from 'react'
import { useTheme } from '../context/ThemeContext';

const Services = () => {
  const { theme} = useTheme();
  const dark = theme === 'dark';
  return (
    <div>Services</div>
  )
}

export default Services;