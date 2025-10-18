import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiDocumentText, HiHeart } from 'react-icons/hi';
import api from '../utils/axios';
import { showToast } from '../components/Toast';
import LanguageToggle from '../components/LanguageToggle';

const Timeline = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [activeVital, setActiveVital] = useState(null);
  const [insight, setInsight] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    (async () => {
      try {
        const [{ data: r }, { data: v }] = await Promise.all([
          api.get('/api/reports?limit=100&page=1'),
          api.get('/api/vitals?limit=100&page=1'),
        ]);
        setReports(r.items || []);
        setVitals(v.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const analyzeVital = async (v) => {
    try {
      setActiveVital(v);
      setInsight(null);
      setOpen(true);
      setAnalyzing(true);
      const { data } = await api.post(`/api/vitals/${v._id}/analyze`);
      setInsight(data.insight || null);
    } catch (e) {
      showToast('Failed to analyze vitals', 'error');
      setOpen(false);
    } finally {
      setAnalyzing(false);
    }
  };

  const items = useMemo(() => {
    const rr = reports.map((x) => ({
      _id: x._id,
      type: 'report',
      date: new Date(x.dateTaken),
      title: x.title,
      meta: x,
    }));
    const vv = vitals.map((x) => ({
      _id: x._id,
      type: 'vital',
      date: new Date(x.date),
      title: x.type.toUpperCase(),
      meta: x,
    }));
    let merged = [...rr, ...vv].sort((a, b) => b.date - a.date);
    if (filter === 'reports') merged = merged.filter((i) => i.type === 'report');
    if (filter === 'vitals') merged = merged.filter((i) => i.type === 'vital');
    return merged;
  }, [reports, vitals, filter]);

  return (
    <>
    <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className={`text-4xl font-extrabold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Timeline</h1>
          <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Combined view of your reports and vitals over time</p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setFilter('all')} className={`px-5 py-2 rounded-lg font-semibold transition ${filter==='all' ? (dark ? 'bg-[#009966] text-white' : 'bg-[#009966] text-white') : (dark ? 'border border-[#009966] border-opacity-30 text-gray-400 hover:bg-[#009966] hover:bg-opacity-10' : 'border border-[#009966] border-opacity-20 text-gray-600 hover:bg-[#009966] hover:bg-opacity-5')}`}>All</button>
          <button onClick={() => setFilter('reports')} className={`px-5 py-2 rounded-lg font-semibold transition ${filter==='reports' ? (dark ? 'bg-[#009966] text-white' : 'bg-[#009966] text-white') : (dark ? 'border border-[#009966] border-opacity-30 text-gray-400 hover:bg-[#009966] hover:bg-opacity-10' : 'border border-[#009966] border-opacity-20 text-gray-600 hover:bg-[#009966] hover:bg-opacity-5')}`}>Reports</button>
          <button onClick={() => setFilter('vitals')} className={`px-5 py-2 rounded-lg font-semibold transition ${filter==='vitals' ? (dark ? 'bg-[#009966] text-white' : 'bg-[#009966] text-white') : (dark ? 'border border-[#009966] border-opacity-30 text-gray-400 hover:bg-[#009966] hover:bg-opacity-10' : 'border border-[#009966] border-opacity-20 text-gray-600 hover:bg-[#009966] hover:bg-opacity-5')}`}>Vitals</button>
        </div>

        {loading ? (
          <div className={dark ? 'text-gray-400' : 'text-gray-600'}>Loading...</div>
        ) : (
          <div className="space-y-4">
            {items.map((i) => (
              <div key={`${i.type}-${i._id}`} className={`rounded-2xl p-5 border-l-4 ${i.type === 'report' ? (dark ? 'border-[#00cc88] bg-gray-900' : 'border-[#009966] bg-gray-50') : (dark ? 'border-[#009966] bg-gray-900' : 'border-[#009966] bg-green-50')}`}>
                <div className={`text-xs mb-2 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{i.date.toLocaleString()}</div>
                <div className={`font-bold text-lg mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  <div className="flex items-center gap-2">
                    {i.type === 'report' ? <HiDocumentText className="text-xl" /> : <HiHeart className="text-xl" />}
                    <span>{i.type === 'report' ? i.title : i.title}</span>
                  </div>
                </div>
                <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-700'}`}>
                  {i.type === 'report' ? (
                    <Link to={`/reports/${i._id}`} className={`font-semibold ${dark ? 'text-[#00cc88] hover:underline' : 'text-[#009966] hover:underline'}`}>Open report →</Link>
                  ) : (
                    <>
                      {i.meta.type === 'bp' && (
                        <div className="font-semibold">BP: {i.meta.values?.systolic ?? '-'} / {i.meta.values?.diastolic ?? '-'} mmHg</div>
                      )}
                      {i.meta.type === 'sugar' && (
                        <div className="font-semibold">Sugar: {i.meta.values?.value ?? '-'} mg/dL</div>
                      )}
                      {i.meta.type === 'weight' && (
                        <div className="font-semibold">Weight: {i.meta.values?.value ?? '-'} kg</div>
                      )}
                      {i.meta.type === 'other' && (
                        <div className="font-semibold">Value: {i.meta.values?.value ?? '-'}</div>
                      )}
                      {i.meta.notes && <div className="text-xs mt-1 opacity-75">Note: {i.meta.notes}</div>}
                      <div className="mt-3">
                        <button onClick={() => analyzeVital(i.meta)} className={`px-4 py-2 rounded-lg font-semibold transition ${dark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}>Analyze Vitals</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {!items.length && <div className={`text-center py-12 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>No items yet. Upload a report or add vitals to get started!</div>}
          </div>
        )}
      </div>
    </div>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
        <div className={`relative w-full max-w-lg mx-auto rounded-2xl p-6 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Vitals Analysis</h3>
            <div className="flex items-center gap-3">
              <LanguageToggle value={lang} onChange={setLang} />
              <button onClick={() => setOpen(false)} className={`px-3 py-1 rounded-lg border ${dark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}>Close</button>
            </div>
          </div>
          {!activeVital ? (
            <div className={dark ? 'text-gray-400' : 'text-gray-600'}>No vital selected.</div>
          ) : analyzing ? (
            <div className={dark ? 'text-gray-400' : 'text-gray-600'}>Analyzing...</div>
          ) : !insight ? (
            <div className={dark ? 'text-gray-400' : 'text-gray-600'}>No insight yet.</div>
          ) : (
            <div className="space-y-4">
              {insight.languageSummaries?.en || insight.languageSummaries?.roman ? (
                <div>
                  <div className={`font-semibold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Summary</div>
                  <p className={dark ? 'text-gray-300' : 'text-gray-700'}>{insight.languageSummaries?.[lang] || ''}</p>
                </div>
              ) : null}
              {insight.assessment && (
                <div>
                  <div className={`font-semibold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Assessment</div>
                  <p className={dark ? 'text-gray-300' : 'text-gray-700'}>{insight.assessment}</p>
                </div>
              )}
              {insight.alerts?.length ? (
                <div>
                  <div className={`font-semibold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Alerts</div>
                  <ul className="list-disc ml-5 text-sm">
                    {insight.alerts.map((a, idx) => (
                      <li key={idx} className={`${a.status === 'high' || a.status === 'low' ? 'text-red-500' : (dark ? 'text-gray-300' : 'text-gray-700')}`}>
                        {a.key}: {a.status} {a.reason ? `- ${a.reason}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {insight.advice?.length ? (
                <div>
                  <div className={`font-semibold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Advice</div>
                  <ul className="list-disc ml-5 text-sm">
                    {insight.advice.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {insight.followupQuestions?.length ? (
                <div>
                  <div className={`font-semibold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Follow-up Questions</div>
                  <ul className="list-disc ml-5 text-sm">
                    {insight.followupQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default Timeline;
