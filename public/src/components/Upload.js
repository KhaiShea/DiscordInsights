import React, { useState } from 'react';
import Papa from 'papaparse';

const Upload = ({ onDataLoaded }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    onDataLoaded(result.data);
                },
                error: (error) => {
                    console.error("Error parsing file: ", error);
                }
            });
        }
    };

    return (
        <div className="box">
            <h3 className="title is-4">Upload Your Discord Messages</h3>
            <div className="file is-info has-name">
                <label className="file-label">
                    <input className="file-input" type="file" accept=".csv" onChange={handleFileChange} />
                    <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Choose a file…</span>
          </span>
                    {file && <span className="file-name">{file.name}</span>}
                </label>
            </div>
            <button className="button is-primary mt-4" onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;