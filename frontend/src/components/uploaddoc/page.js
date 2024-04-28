"use client";
import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // for generating unique IDs
import { url } from "../../app/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import DeleteDoc from "./DeleteDoc";

const UploadDocuments = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    // Mapping uploaded files to add unique ID
    const updatedFiles = files.map((file) => ({
      id: uuidv4(),
      name: file.name,
      type: file.type,
      size: file.size,
      file,
    }));

    // Updating uploaded files state
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleSubmission = async (file) => {
    const formData = new FormData();
    formData.append("file", file.file);

    const res = await axios.post(`${url}/api/upload`, formData, {
      headers: { token: user.token },
    });

    if (res.status === 200) {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((fl) => fl.id !== file.id),
      );
      setUploadedFiles((prevFiles) => [...prevFiles, res.data.file]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      toast("File has been submited successfully.");
      return;
    }
    toast.error("something went wrong.");
  };

  const fetchAllFiles = async () => {
    const res = await axios.get(`${url}/api/files`, {
      headers: { token: user.token },
    });
    setUploadedFiles(res.data.files);
  };

  const deleteFile = useCallback(async (file) => {
    try {
      const res = await axios.delete(`${url}/api/file/${file}`, {
        headers: { token: user.token },
      });
      const { data, error } = res.data;
      if (res.status === 200) {
        setUploadedFiles((prevFiles) => prevFiles.filter((fl) => fl !== file));
        return toast(data);
      }
      toast(error);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const removedFile = useCallback(
    (id) => {
      if (!id) return;
      const updatedFiles = selectedFiles.filter((item) => item.id !== id);
      setSelectedFiles(updatedFiles);
      toast("file has been removed successfully.");
    },
    [selectedFiles],
  );

  useEffect(() => {
    fetchAllFiles();
  }, []);

  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-5 my-5">
      <secion className="mx-auto p-8 w-full text-orange-400 m-4 mt-10  bg-white rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Upload Documents</h2>
        <input
          type="file"
          ref={fileInputRef}
          className="mb-4"
          onChange={handleFileUpload}
          multiple
        />

        {/* Section for displaying uploaded documents */}
        <div>
          <h3 className="text-2xl text-orange-400 font-bold mt-4  mb-2">
            Selected Documents
          </h3>
          <ul>
            {selectedFiles.map((file) => (
              <li
                key={file.id}
                className="flex justify-between items-center py-2 border-b border-gray-300"
              >
                <div className="flex items-center">
                  <span className="text-gray-700">{file.name}</span>
                  {/* <span className="text-sm text-gray-500 ml-2"> */}
                  {/*   ({file.type}, {(file.size / 1000).toFixed(2)} KB) */}
                  {/* </span> */}
                </div>
                <div className="flex space-x-2 item-center">
                  <DeleteDoc
                    id={file.id}
                    removedFile={removedFile}
                    isSubmited={false}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2  rounded"
                    onClick={() => handleSubmission(file)}
                  >
                    Submit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </secion>

      <section className="mx-auto p-8 text-orange-400 m-4 mt-10  w-full bg-white rounded-lg border">
        <div>
          <h3 className="text-2xl text-orange-400 font-bold  mb-2">
            Submitted Documents
          </h3>
          <ul>
            {uploadedFiles.map((file) => (
              <li
                key={file}
                className="flex justify-between items-center py-2 border-b border-gray-300"
              >
                <div className="flex items-center">
                  <span className="text-gray-700">{file}</span>
                </div>
                <DeleteDoc id={file} removedFile={deleteFile} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UploadDocuments;
