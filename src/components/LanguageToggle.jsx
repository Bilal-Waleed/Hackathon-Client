import React from 'react';

const LanguageToggle = ({ value = 'en', onChange, dark = false }) => {
  const active = 'bg-[#009966] text-white';
  const inactive = dark ? 'bg-transparent text-gray-300' : 'bg-white text-black';
  const border = dark ? 'border-[#009966] border-opacity-30' : 'border-[#009966] border-opacity-20';
  return (
    <div className={`inline-flex border rounded-lg overflow-hidden ${border}`}>
      <button
        className={`px-3 py-1 font-semibold transition ${value === 'en' ? active : inactive}`}
        onClick={() => onChange && onChange('en')}
        type="button"
      >
        EN
      </button>
      <button
        className={`px-3 py-1 font-semibold transition ${value === 'roman' ? active : inactive}`}
        onClick={() => onChange && onChange('roman')}
        type="button"
      >
        Roman Urdu
      </button>
    </div>
  );
};

export default LanguageToggle;
