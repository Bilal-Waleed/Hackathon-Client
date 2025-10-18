import React from 'react';

const LanguageToggle = ({ value = 'en', onChange }) => {
  return (
    <div className="inline-flex border rounded overflow-hidden">
      <button
        className={`px-3 py-1 ${value === 'en' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        onClick={() => onChange && onChange('en')}
        type="button"
      >
        EN
      </button>
      <button
        className={`px-3 py-1 ${value === 'roman' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        onClick={() => onChange && onChange('roman')}
        type="button"
      >
        Roman Urdu
      </button>
    </div>
  );
};

export default LanguageToggle;
