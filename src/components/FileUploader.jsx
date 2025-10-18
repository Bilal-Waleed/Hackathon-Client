import React, { useState } from 'react';

const FileUploader = ({ onSelected, dark }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    onSelected && onSelected(f);
  };

  const isPdf = file?.type === 'application/pdf' || (file?.name || '').toLowerCase().endsWith('.pdf');

  return (
    <div className="space-y-3">
      <input type="file" accept=".pdf,image/*" onChange={onSelect} />
      {preview && (
        <div className={`border p-2 rounded ${dark ? 'border-[#009966] border-opacity-30' : 'border-[#009966] border-opacity-20'}`}>
          {isPdf ? (
            <div className={`${dark ? 'text-gray-300' : 'text-gray-700'}`}>{file?.name}</div>
          ) : (
            <img src={preview} alt="preview" className="max-h-48 object-contain" />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
