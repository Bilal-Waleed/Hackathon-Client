import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import FileUploader from '../components/FileUploader';
import api from '../utils/axios';
import { showToast } from '../components/Toast';
import axios from 'axios';

const UploadReport = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [meta, setMeta] = useState({
    title: '',
    dateTaken: '',
    notes: '',
    tag: 'lab',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast('Please select a file (PDF or image)', 'error');
      return;
    }
    if (!meta.title || !meta.dateTaken) {
      showToast('Title and Date are required', 'error');
      return;
    }
    try {
      setAnalyzing(true);
      // 1) Get signed params
      const { data: signed } = await api.get('/api/files/signed-params');
      // 2) Upload to Cloudinary (use auto for PDFs, image for images)
      const isPdf = selectedFile.type === 'application/pdf' || (selectedFile.name || '').toLowerCase().endsWith('.pdf');
      const imageEndpoint = `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`;
      const rawEndpoint = `https://api.cloudinary.com/v1_1/${signed.cloudName}/raw/upload`;
      const form = new FormData();
      form.append('file', selectedFile);
      form.append('api_key', signed.apiKey);
      form.append('timestamp', signed.timestamp);
      form.append('signature', signed.signature);
      form.append('folder', signed.folder);

      let res;
      try {
        res = await axios.post(imageEndpoint, form);
      } catch (err) {
        if (isPdf) {
          // Fallback: some accounts treat PDFs as raw on upload
          res = await axios.post(rawEndpoint, form);
        } else {
          throw err;
        }
      }
      const c = res.data;
      const fileUrl = c.secure_url;
      const filePublicId = c.public_id;
      const format = c.format?.toLowerCase();
      const fileType = isPdf || format === 'pdf' ? 'pdf' : 'image';

      // 3) Extract pages/images into a folder (for later page viewing/compose)
      const pages = c.pages || 1;
      const pagesFolder = `healthmate/pages/${filePublicId}`;
      const tag = `pages:${filePublicId}`;
      try {
        await api.post('/api/files/extract-pdf-pages', {
          filePublicId,
          fileUrl,
          folder: pagesFolder,
          pages,
          tag,
        });
      } catch (_) {
        // Non-blocking: continue to create report and analyze even if page extraction fails
      }

      // 4) Create report + analyze
      const payload = {
        title: meta.title,
        fileUrl,
        filePublicId,
        fileType,
        dateTaken: meta.dateTaken,
        tags: [meta.tag],
        notes: meta.notes,
        analyze: true,
      };
      const { data } = await api.post('/api/reports/upload', payload);
      navigate(`/reports/${data.report._id}`);
    } catch (e) {
      showToast('Upload failed', 'error');
    }
    finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-10 ${dark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className={`text-4xl font-extrabold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>Upload Report</h1>
          <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Upload lab reports, prescriptions, or imaging results for AI analysis</p>
        </div>
        
        <div className={`rounded-2xl p-6 border ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30' : 'bg-gray-50 border-[#009966] border-opacity-20'}`}>
          <FileUploader onSelected={setSelectedFile} dark={dark} />
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Report Title *</label>
            <input
              type="text"
              placeholder="e.g., Blood Test Results"
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`}
              value={meta.title}
              onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Date Taken *</label>
            <input
              type="date"
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`}
              value={meta.dateTaken}
              onChange={(e) => setMeta((m) => ({ ...m, dateTaken: e.target.value }))}
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
            <select
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`}
              value={meta.tag}
              onChange={(e) => setMeta((m) => ({ ...m, tag: e.target.value }))}
            >
              <option value="lab">Lab</option>
              <option value="imaging">Imaging</option>
              <option value="prescription">Prescription</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Notes (Optional)</label>
            <textarea
              placeholder="Add any additional notes..."
              rows="4"
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 text-white focus:ring-[#009966]' : 'bg-white border-[#009966] border-opacity-20 text-gray-900 focus:ring-[#009966]'}`}
              value={meta.notes}
              onChange={(e) => setMeta((m) => ({ ...m, notes: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            disabled={!selectedFile || analyzing}
            className={`w-full px-6 py-3 rounded-xl font-semibold transition ${(!selectedFile || analyzing) ? 'opacity-50 cursor-not-allowed' : ''} ${dark ? 'bg-[#009966] hover:bg-[#00805a] text-white' : 'bg-[#009966] hover:bg-[#00805a] text-white'}`}
          >
            {analyzing ? 'Analyzing...' : (selectedFile ? 'Save & Analyze with AI' : 'Select file first')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadReport;
