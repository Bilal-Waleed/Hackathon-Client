import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiDocumentText, HiHeart, HiCalendar } from 'react-icons/hi';

const Discover = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <section id="discover" className={`py-20 px-4 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-extrabold mb-3 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Discover HealthMate</h2>
          <p className={`text-lg ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Reports safe rakhna aur unka seedha aur asaan matlab milna.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className={`rounded-2xl p-6 border transition hover:shadow-lg ${dark ? 'bg-black border-[#009966] border-opacity-30 hover:border-[#00cc88]' : 'bg-white border-[#009966] border-opacity-20 hover:border-[#009966] hover:border-opacity-40'}`}>
            <HiDocumentText className={`text-4xl mb-3 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
            <div className="font-bold text-xl mb-2">Upload & AI Insights</div>
            <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>PDFs ya images upload karen, Gemini se English + Roman Urdu summary hasil karen.</p>
          </div>
          <div className={`rounded-2xl p-6 border transition hover:shadow-lg ${dark ? 'bg-black border-[#009966] border-opacity-30 hover:border-[#00cc88]' : 'bg-white border-[#009966] border-opacity-20 hover:border-[#009966] hover:border-opacity-40'}`}>
            <HiHeart className={`text-4xl mb-3 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
            <div className="font-bold text-xl mb-2">Vitals Tracking</div>
            <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>BP, sugar, weight record karen — time ke sath trend dekhein.</p>
          </div>
          <div className={`rounded-2xl p-6 border transition hover:shadow-lg ${dark ? 'bg-black border-[#009966] border-opacity-30 hover:border-[#00cc88]' : 'bg-white border-[#009966] border-opacity-20 hover:border-[#009966] hover:border-opacity-40'}`}>
            <HiCalendar className={`text-4xl mb-3 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
            <div className="font-bold text-xl mb-2">Timeline & Sharing</div>
            <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Reports + vitals ek hi feed mein. Aane wale update mein signed share links.</p>
          </div>
        </div>

        <div className={`rounded-2xl p-8 border ${dark ? 'bg-black border-[#009966] border-opacity-30' : 'bg-white border-[#009966] border-opacity-20'}`}>
          <h3 className={`text-2xl font-bold mb-6 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>How it works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${dark ? 'bg-[#009966] bg-opacity-20 text-[#009966]' : 'bg-[#009966] bg-opacity-10 text-[#009966]'}`}>Step 1</div>
              <p className="text-sm">Report upload karein (drag & drop supported).</p>
            </div>
            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${dark ? 'bg-[#009966] bg-opacity-20 text-[#009966]' : 'bg-[#009966] bg-opacity-10 text-[#009966]'}`}>Step 2</div>
              <p className="text-sm">AI summary dekhein, highlights aur doctor questions note karein.</p>
            </div>
            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${dark ? 'bg-[#009966] bg-opacity-20 text-[#009966]' : 'bg-[#009966] bg-opacity-10 text-[#009966]'}`}>Step 3</div>
              <p className="text-sm">Vitals add karke timeline par progress track karein.</p>
            </div>
          </div>
        </div>

        <div className={`text-xs mt-8 text-center ${dark ? 'text-gray-600' : 'text-gray-500'}`}>For education and understanding only — consult your doctor for treatment.</div>
      </div>
    </section>
  );
};

export default Discover;
