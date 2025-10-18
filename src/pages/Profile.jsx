import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { User } = useContext(AuthContext);
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const u = User?.user || User; // fallback

  return (
    <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className={`text-4xl font-extrabold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Profile</h1>
          <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Your account information and settings</p>
        </div>

        {!u ? (
          <div className={dark ? 'text-gray-400' : 'text-gray-600'}>Loading...</div>
        ) : (
          <div className="space-y-6">
            <div className={`rounded-2xl p-8 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
              <div className="flex items-center gap-6">
                {u.avatar ? (
                  <img src={u.avatar} alt={u.name} className="h-24 w-24 rounded-full border-4 border-[#009966]" />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#009966] to-[#00cc88] flex items-center justify-center text-white text-3xl font-bold">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-2xl font-bold mb-1">{u.name}</div>
                  <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{u.email}</div>
                  {u.isVerified && (
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#009966] bg-opacity-20 text-[#009966]">
                      ✓ Verified
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
              <h2 className={`text-xl font-bold mb-4 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Account Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-opacity-20 ${dark ? 'border-gray-700' : 'border-gray-300'}">
                  <span className={`font-semibold ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Name</span>
                  <span>{u.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-opacity-20 ${dark ? 'border-gray-700' : 'border-gray-300'}">
                  <span className={`font-semibold ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Email</span>
                  <span>{u.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-opacity-20 ${dark ? 'border-gray-700' : 'border-gray-300'}">
                  <span className={`font-semibold ${dark ? 'text-gray-400' : 'text-gray-600'}`}>CNIC</span>
                  <span>{u.cnic || '—'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className={`font-semibold ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Member Since</span>
                  <span>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</span>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
              <h2 className={`text-xl font-bold mb-4 ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Quick Stats</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className={`text-center p-4 rounded-xl ${dark ? 'bg-black' : 'bg-white'}`}>
                  <div className={`text-3xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>—</div>
                  <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>Reports</div>
                </div>
                <div className={`text-center p-4 rounded-xl ${dark ? 'bg-black' : 'bg-white'}`}>
                  <div className={`text-3xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>—</div>
                  <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>Vitals</div>
                </div>
                <div className={`text-center p-4 rounded-xl ${dark ? 'bg-black' : 'bg-white'}`}>
                  <div className={`text-3xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>—</div>
                  <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>Days Active</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
