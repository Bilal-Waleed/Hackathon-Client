import React from 'react';
import { Link } from 'react-router-dom';

const ReportCard = ({ report, dark }) => {
  return (
    <Link to={`/reports/${report._id}`} className={`block rounded-2xl p-5 border transition hover:shadow-xl ${dark ? 'bg-gray-900 border-[#009966] border-opacity-30 hover:border-[#00cc88]' : 'bg-gray-50 border-[#009966] border-opacity-20 hover:border-[#009966] hover:border-opacity-40'}`}>
      <div className={`text-xs mb-2 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{new Date(report.dateTaken).toLocaleDateString()}</div>
      <div className="font-bold text-lg mb-1">{report.title}</div>
      <div className={`text-xs font-semibold ${dark ? 'text-[#00cc88]' : 'text-[#009966]'}`}>{report.fileType.toUpperCase()}</div>
      {report.tags?.length ? (
        <div className={`text-xs mt-2 ${dark ? 'text-gray-600' : 'text-gray-600'}`}>{report.tags.join(', ')}</div>
      ) : null}
    </Link>
  );
};

export default ReportCard;
