import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // for generating unique IDs

const UploadDocuments = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    // Mapping uploaded files to add unique ID
    const updatedFiles = files.map(file => ({
      id: uuidv4(),
      name: file.name,
      type: file.type,
      size: file.size,
    }));

    // Updating uploaded files state
    setUploadedFiles(prevFiles => [...prevFiles, ...updatedFiles]);
  };

  // Function to handle file deletion
  const handleDeleteFile = (id) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  return (
    <>
    <div className="max-w-3xl mx-auto p-8 text-orange-400 m-4 mt-10  bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Documents</h2>
      {/* File input for document upload */}
      <input
        type="file"
        className="mb-4"
        onChange={handleFileUpload}
        multiple
      />

      {/* Section for displaying uploaded documents */}
      <div>
        <h3 className="text-2xl text-orange-400 font-bold mt-4  mb-2">Selected Documents</h3>
        <ul>
          {uploadedFiles.map(file => (
            <li key={file.id} className="flex justify-between items-center py-2 border-b border-gray-300">
              <div className="flex items-center">
                <span className="text-gray-700">{file.name}</span>
                <span className="text-sm text-gray-500 ml-2">({file.type}, {(file.size / 1000).toFixed(2)} KB)</span>
              </div>
              <div className="flex">
                {/* Edit button */}
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => alert('Edit action')}>
                  Edit
                </button>
                {/* Delete button */}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteFile(file.id)}>
                  Delete
                </button>
                
              </div>
              <button
  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
  onClick={() => handleSubmission()}>
  Submit
</button>
            </li>
          ))}
        </ul>
      </div>
    </div>

<div className="max-w-3xl mx-auto p-8 text-orange-400 m-4 mt-10  bg-white rounded-lg shadow-lg">
<div>
        <h3 className="text-2xl text-orange-400 font-bold  mb-2">Submitted Documents</h3>
        <ul>
          {uploadedFiles.map(file => (
            <li key={file.id} className="flex justify-between items-center py-2 border-b border-gray-300">
              <div className="flex items-center">
                <span className="text-gray-700">{file.name}</span>
                <span className="text-sm text-gray-500 ml-2">({file.type}, {(file.size / 1000).toFixed(2)} KB)</span>
              </div>
              <div className="flex">
                {/* Edit button */}
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => alert('Edit action')}>
                  Edit
                </button>
                {/* Delete button */}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteFile(file.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      </div>

      </>


  );
};

export default UploadDocuments;
