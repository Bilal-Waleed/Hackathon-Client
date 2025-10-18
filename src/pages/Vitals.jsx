import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HiHeart, HiBeaker, HiScale, HiChartBar } from 'react-icons/hi';
import api from '../utils/axios';
import { showToast } from '../components/Toast';

const Vitals = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [type, setType] = useState('auto');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [form, setForm] = useState({ systolic: '', diastolic: '', sugar: '', sugarType: 'fasting', height: '', weight: '', spo2: '', heartRate: '', timeOfDay: '', frequency: '' });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!date) return showToast('Date/time is required', 'error');
    try {
      setSubmitting(true);
      const num = (v) => (v === '' || v === null || v === undefined ? undefined : Number(v));
      const payload = {
        type: type === 'auto' ? undefined : type,
        date,
        notes,
        systolic: num(form.systolic),
        diastolic: num(form.diastolic),
        sugar: num(form.sugar),
        sugarType: form.sugarType || undefined,
        height: num(form.height),
        weight: num(form.weight),
        spo2: num(form.spo2),
        heartRate: num(form.heartRate),
        timeOfDay: form.timeOfDay || undefined,
        frequency: form.frequency || undefined,
      };
      await api.post('/api/vitals', payload);
      showToast('Vital saved', 'success');
      setNotes('');
      setForm({ systolic: '', diastolic: '', sugar: '', sugarType: 'fasting', height: '', weight: '', spo2: '', heartRate: '', timeOfDay: '', frequency: '' });
    } catch (e) {
      showToast('Failed to save', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className={`text-4xl font-extrabold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Add Vitals</h1>
          <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Track your blood pressure, sugar, weight, and more</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Vital Type (Optional)</label>
                <select className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="auto">Auto detect</option>
                  <option value="bp">Blood Pressure</option>
                  <option value="sugar">Sugar</option>
                  <option value="weight">Weight</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Date & Time *</label>
                <input type="datetime-local" className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Blood Pressure (mmHg)</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Systolic (e.g., 120)" className={`rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.systolic} onChange={(e) => setForm((v) => ({ ...v, systolic: e.target.value }))} />
                  <input type="number" placeholder="Diastolic (e.g., 80)" className={`rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.diastolic} onChange={(e) => setForm((v) => ({ ...v, diastolic: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Sugar (mg/dL) & Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="e.g., 110" className={`rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.sugar} onChange={(e) => setForm((v) => ({ ...v, sugar: e.target.value }))} />
                  <select className={`rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.sugarType} onChange={(e) => setForm((v) => ({ ...v, sugarType: e.target.value }))}>
                    <option value="fasting">Fasting</option>
                    <option value="random">Random</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Height (cm)</label>
                  <input type="number" step="0.1" placeholder="e.g., 170" className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.height} onChange={(e) => setForm((v) => ({ ...v, height: e.target.value }))} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Weight (kg)</label>
                  <input type="number" step="0.1" placeholder="e.g., 70.5" className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.weight} onChange={(e) => setForm((v) => ({ ...v, weight: e.target.value }))} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>SpO₂ (%)</label>
                  <input type="number" placeholder="e.g., 98" className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.spo2} onChange={(e) => setForm((v) => ({ ...v, spo2: e.target.value }))} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Heart Rate (bpm)</label>
                  <input type="number" placeholder="e.g., 72" className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.heartRate} onChange={(e) => setForm((v) => ({ ...v, heartRate: e.target.value }))} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Time of Day</label>
                  <input type="text" placeholder="e.g., Morning/Evening" className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.timeOfDay} onChange={(e) => setForm((v) => ({ ...v, timeOfDay: e.target.value }))} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Frequency</label>
                  <select className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={form.frequency} onChange={(e) => setForm((v) => ({ ...v, frequency: e.target.value }))}>
                    <option value="">One-time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Notes (Optional)</label>
                <textarea placeholder="Add any notes about this reading..." rows="3" className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={submitting} className={`w-full px-6 py-3 rounded-xl font-semibold transition ${submitting ? 'opacity-50 cursor-not-allowed' : ''} ${dark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}>
            {submitting ? 'Saving...' : 'Save Vital'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vitals;
