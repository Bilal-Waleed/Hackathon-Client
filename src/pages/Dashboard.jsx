import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/axios';
import ReportCard from '../components/ReportCard';

const Dashboard = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [latest, setLatest] = useState({ lastBP: null, lastSugar: null, lastWeight: null, lastReport: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: r }, { data: v }, { data: L }] = await Promise.all([
          api.get('/api/reports?limit=3&page=1'),
          api.get('/api/vitals?limit=5&page=1'),
          api.get('/api/stats/latest'),
        ]);
        setReports(r.items || []);
        setVitals(v.items || []);
        setLatest(L || {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const lastBP = latest.lastBP;
  const lastSugar = latest.lastSugar;
  const lastWeight = latest.lastWeight;
  const lastReport = latest.lastReport;

  return (
    <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className={`text-4xl font-extrabold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6">
          <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className={`text-sm mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Last BP</div>
            <div className={`text-3xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>
              {lastBP ? `${lastBP.systolic ?? '-'} / ${lastBP.diastolic ?? '-'}` : '—'}
            </div>
            <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>{lastBP?.date ? new Date(lastBP.date).toLocaleString() : ''}</div>
          </div>
          <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className={`text-sm mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Last Sugar</div>
            <div className={`text-3xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>{lastSugar ? (lastSugar.value ?? '—') : '—'}</div>
            <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>{lastSugar?.date ? new Date(lastSugar.date).toLocaleString() : ''}</div>
          </div>
          <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className={`text-sm mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Last Weight</div>
            <div className={`text-3xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>{lastWeight ? (lastWeight.value ?? '—') : '—'}</div>
            <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>{lastWeight?.date ? new Date(lastWeight.date).toLocaleString() : ''}</div>
          </div>
          <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className={`text-sm mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Last Report</div>
            <div className={`text-base font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>{lastReport ? lastReport.title : '—'}</div>
            <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-600'}`}>{lastReport?.dateTaken ? new Date(lastReport.dateTaken).toLocaleString() : ''}</div>
            {lastReport?.id && (
              <div className="mt-2">
                <Link to={`/reports/${lastReport.id}`} className={`text-xs font-semibold ${dark ? 'text-[#00cc88] hover:underline' : 'text-[#009966] hover:underline'}`}>Open last report →</Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/upload" className={`px-5 py-3 rounded-lg font-semibold transition ${dark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}>Upload Report</Link>
          <Link to="/vitals" className={`px-5 py-3 rounded-lg font-semibold border transition ${dark ? 'border-[#009966] text-[#00cc88] hover:bg-[#009966] hover:bg-opacity-10' : 'border-[#009966] text-[#009966] hover:bg-[#009966] hover:bg-opacity-5'}`}>Add Vitals</Link>
          <Link to="/timeline" className={`px-5 py-3 rounded-lg font-semibold border transition ${dark ? 'border-[#009966] text-[#00cc88] hover:bg-[#009966] hover:bg-opacity-10' : 'border-[#009966] text-[#009966] hover:bg-[#009966] hover:bg-opacity-5'}`}>Timeline</Link>
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Recent Reports</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {reports.map((r) => (
                <ReportCard key={r._id} report={r} dark={dark} />
              ))}
              {!reports.length && <div className={dark ? 'text-gray-500' : 'text-gray-500'}>No reports yet.</div>}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className={`text-2xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Recent Vitals</h2>
          <div className="space-y-3">
            {vitals.map((v) => (
              <div key={v._id} className={`rounded-xl p-4 border flex justify-between ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
                <div>
                  <div className="font-semibold">{v.type.toUpperCase()}</div>
                  <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(v.date).toLocaleString()}</div>
                </div>
                <div className={`font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>
                  {v.type === 'bp' ? (
                    <div>{v.values?.systolic ?? '-'} / {v.values?.diastolic ?? '-'}</div>
                  ) : (
                    <div>{v.values?.value ?? '-'}</div>
                  )}
                </div>
              </div>
            ))}
            {!vitals.length && <div className={dark ? 'text-gray-500' : 'text-gray-500'}>No vitals yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
