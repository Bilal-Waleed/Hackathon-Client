import React from 'react';
import Discover from '../components/Discover';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <div className={dark ? 'bg-black text-white' : 'bg-white text-gray-900'}>
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${dark ? 'bg-[#009966] bg-opacity-20 text-[#009966]' : 'bg-[#009966] bg-opacity-10 text-[#009966]'}`}>
              AI-Powered Health Vault
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              HealthMate
            </h1>
            <p className={`mt-4 text-xl ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              Aapka personal health vault. Upload reports, get bilingual AI summaries, track vitals.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/register" className={`px-6 py-3 rounded-lg font-semibold transition ${dark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}>Get Started</a>
              <a href="/about" className={`px-6 py-3 rounded-lg font-semibold border transition ${dark ? 'border-[#009966] text-[#00cc88] hover:bg-[#009966] hover:bg-opacity-10' : 'border-[#009966] text-[#009966] hover:bg-[#009966] hover:bg-opacity-5'}`}>Learn More</a>
            </div>
            <div className={`mt-4 text-xs ${dark ? 'text-gray-500' : 'text-gray-500'}`}>For education only — consult your doctor for treatment.</div>
          </div>
          <div className="hidden md:block">
            <div className={`rounded-2xl p-8 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
              <div className={`text-2xl font-bold mb-4 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Why HealthMate?</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className={`mt-1 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>✓</span>
                  <span>Secure Cloudinary uploads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`mt-1 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>✓</span>
                  <span>Gemini AI summaries (EN + Roman Urdu)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`mt-1 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>✓</span>
                  <span>BP, Sugar, Weight tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`mt-1 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>✓</span>
                  <span>Combined timeline view</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Discover />
    </div>
  );
};

export default Home;
