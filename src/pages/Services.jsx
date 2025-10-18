import React from 'react'
import { useTheme } from '../context/ThemeContext';
import { HiCloud, HiLightningBolt, HiChartBar, HiLockClosed, HiMap } from 'react-icons/hi';

const Services = () => {
  const { theme} = useTheme();
  const dark = theme === 'dark';
  return (
    <div className={`px-4 py-20 min-h-screen ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Our Services</h1>
          <p className={`text-lg ${dark ? 'text-gray-400' : 'text-gray-600'}`}>HealthMate — Aapka personal health vault. Reports upload, AI summaries, aur vitals tracking ek jagah.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className={`rounded-2xl p-8 border transition hover:shadow-xl ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 hover:border-[#00cc88]' : 'bg-gray-50 border-[#009966] border-opacity-20 hover:border-[#009966] hover:border-opacity-40'}`}>
            <HiCloud className={`text-5xl mb-4 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
            <div className="font-bold text-xl mb-3">Report Upload</div>
            <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>PDFs/images secure upload to Cloudinary, fast preview aur management.</p>
          </div>
          <div className={`rounded-2xl p-8 border transition hover:shadow-xl ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 hover:border-[#00cc88]' : 'bg-gray-50 border-[#009966] border-opacity-20 hover:border-[#009966] hover:border-opacity-40'}`}>
            <HiLightningBolt className={`text-5xl mb-4 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
            <div className="font-bold text-xl mb-3">AI Summaries</div>
            <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Gemini se English + Roman Urdu summary, highlights, doctor questions, aur diet tips.</p>
          </div>
          <div className={`rounded-2xl p-8 border transition hover:shadow-xl ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 hover:border-[#00cc88]' : 'bg-gray-50 border-[#009966] border-opacity-20 hover:border-[#009966] hover:border-opacity-40'}`}>
            <HiChartBar className={`text-5xl mb-4 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
            <div className="font-bold text-xl mb-3">Vitals Tracking</div>
            <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>BP, sugar, weight add karein, timeline aur charts se progress dekhein.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`rounded-2xl p-8 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className="flex items-center gap-2 mb-4">
              <HiLockClosed className={`text-2xl ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
              <div className={`font-bold text-xl ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Privacy & Security</div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className={dark ? 'text-[#00cc88]' : 'text-[#009966]'}>✓</span>
                <span>JWT-protected API</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={dark ? 'text-[#00cc88]' : 'text-[#009966]'}>✓</span>
                <span>Signed Cloudinary uploads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={dark ? 'text-[#00cc88]' : 'text-[#009966]'}>✓</span>
                <span>Expiring share links (upcoming)</span>
              </li>
            </ul>
          </div>
          <div className={`rounded-2xl p-8 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className="flex items-center gap-2 mb-4">
              <HiMap className={`text-2xl ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`} />
              <div className={`font-bold text-xl ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Roadmap</div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className={dark ? 'text-[#00cc88]' : 'text-[#009966]'}>✓</span>
                <span>Doctor-ready PDF export</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={dark ? 'text-[#00cc88]' : 'text-[#009966]'}>✓</span>
                <span>Family profiles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={dark ? 'text-[#00cc88]' : 'text-[#009966]'}>✓</span>
                <span>Offline vitals entry</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`text-xs text-center ${dark ? 'text-gray-600' : 'text-gray-500'}`}>For education and understanding only — consult your doctor for treatment.</div>
      </div>
    </div>
  )
}

export default Services;