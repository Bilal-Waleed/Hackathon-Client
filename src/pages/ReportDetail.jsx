import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/axios';
import LanguageToggle from '../components/LanguageToggle';
import { showToast } from '../components/Toast';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [pages, setPages] = useState([]);
  const [composing, setComposing] = useState(false);
  const [composedPdfUrl, setComposedPdfUrl] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/reports/${id}`);
      setData(data);
    } catch (e) {
      showToast('Failed to load report', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getPlainSummary = (insight, langKey) => {
    if (!insight) return '';
    const text = (insight.languageSummaries?.[langKey] || insight.languageSummaries?.en || '').trim();
    if (!text) return '';
    try {
      const obj = JSON.parse(text);
      const inner = obj?.languageSummaries?.[langKey] || obj?.languageSummaries?.en || obj?.assessment;
      if (typeof inner === 'string') return inner;
    } catch {}
    return text;
  };

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        if (!data?.report?.filePublicId) return;
        const { data: resp } = await api.get('/api/files/pages', { params: { filePublicId: data.report.filePublicId } });
        setPages(resp.items || []);
      } catch {}
    })();
  }, [data?.report?.filePublicId]);

  const onAnalyze = async () => {
    try {
      setAnalyzing(true);
      await api.post(`/api/reports/${id}/analyze`);
      await load();
      showToast('Analysis complete', 'success');
    } catch {
      showToast('Analysis failed', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const onDelete = async () => {
    if (!confirm('Delete this report?')) return;
    try {
      await api.delete(`/api/reports/${id}`);
      showToast('Report deleted', 'success');
      navigate('/dashboard');
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  const onFeedback = async (liked) => {
    try {
      await api.post(`/api/reports/${id}/feedback`, { liked });
      showToast('Thanks for the feedback');
    } catch {}
  };

  const { theme } = useTheme();
  const dark = theme === 'dark';

  if (loading) return <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}><div>Loading...</div></div>;
  if (!data) return <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}><div>Report not found</div></div>;

  const { report, aiInsight } = data;
  const isPdf = report.fileType === 'pdf';

  const composePdf = async () => {
    try {
      setComposing(true);
      const tag = `pages:${report.filePublicId}`;
      const { data: r } = await api.post('/api/files/compose-pdf', { tag });
      setComposedPdfUrl(r.pdfUrl);
      showToast('Composed PDF ready', 'success');
    } catch {
      showToast('Failed to compose PDF', 'error');
    } finally {
      setComposing(false);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <div className={`text-xs mb-2 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{new Date(report.dateTaken).toLocaleString()}</div>
            <h1 className={`text-3xl font-extrabold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>{report.title}</h1>
            <div className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{report.fileType.toUpperCase()}</div>
          </div>
          <div className={`border rounded-2xl overflow-hidden ${dark ? 'border-[#009966] border-opacity-30' : 'border-[#009966] border-opacity-20'}`}>
            {isPdf ? (
              <iframe title="pdf" src={report.fileUrl} className="w-full h-[70vh]" />
            ) : (
              <img src={report.fileUrl} alt={report.title} className="w-full object-contain max-h-[70vh]" />
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={onAnalyze} disabled={analyzing} className={`px-5 py-3 rounded-xl font-semibold transition ${analyzing ? 'opacity-50 cursor-not-allowed' : ''} ${dark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}>
              {analyzing ? 'Analyzing...' : 'Re-run Analysis'}
            </button>
            <a href={report.fileUrl} target="_blank" rel="noreferrer" className={`px-5 py-3 rounded-xl font-semibold border transition ${dark ? 'border-[#009966] text-[#00cc88] hover:bg-[#009966] hover:bg-opacity-10' : 'border-[#009966] text-[#009966] hover:bg-[#009966] hover:bg-opacity-5'}`}>Open Original</a>
            <button onClick={onDelete} className="px-5 py-3 rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white transition">Delete</button>
            {pages.length > 1 && (
              <button onClick={composePdf} disabled={composing} className={`px-5 py-3 rounded-xl font-semibold transition ${composing ? 'opacity-50 cursor-not-allowed' : ''} ${dark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}>
                {composing ? 'Composing...' : 'Compose pages to PDF'}
              </button>
            )}
            {composedPdfUrl && (
              <a href={composedPdfUrl} target="_blank" rel="noreferrer" className={`px-5 py-3 rounded-xl font-semibold border transition ${dark ? 'border-[#009966] text-[#00cc88] hover:bg-[#009966] hover:bg-opacity-10' : 'border-[#009966] text-[#009966] hover:bg-[#009966] hover:bg-opacity-5'}`}>Open Composed PDF</a>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>AI Summary</h2>
              <LanguageToggle value={lang} onChange={setLang} />
            </div>

            {!aiInsight ? (
              <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>No analysis yet. Click "Re-run Analysis".</div>
            ) : (
              <div className="space-y-6">
                <p className={`whitespace-pre-wrap text-sm leading-7 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getPlainSummary(aiInsight, lang)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
