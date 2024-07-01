'use client'
import React, { useState } from 'react'
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from '../../../api';
import { toast } from "react-hot-toast";

const JoditEditorComponent = dynamic(() => import('./JodEditorComponent'), { ssr: false })


const FormComponent = ({ getData }) => {
    const initialFormData = {
        name: '',
        image: '',
        desc: '',
        content: ''
    };

    const [loading, setLoading] = useState(false);
    const admin = useSelector((state) => state.admin);
    const [formData, setFormData] = useState(initialFormData);

    const { name, image, desc, content } = formData;

    const config = {
        readonly: false,
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleContentChange = (newContent) => {
        setFormData((prevData) => ({
            ...prevData,
            content: newContent,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (content.length > 5) {
            try {
                const res = await axios.post(
                    `${url}/api/handleblogs`,
                    formData,
                    {
                        headers: {
                            Authorization: admin.token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (res.data.success) {
                    toast.success(res.data.message);
                    setFormData(initialFormData)
                }
                getData();
            } catch (err) {
                if (err?.response?.data?.message) {
                    toast.error(err?.response?.data?.message);
                }
                if (err?.response?.statusText) {
                    toast.error(err?.response?.statusText);
                }
            }
        } else {
            toast.error("Complete all details.");
        }
    };

    return (
        <div className="flex w-full flex-col justify-center items-center my-4">
            <form onSubmit={handleSubmit} className="bg-white mb-4 w-4/5">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={name}
                        onChange={handleInputChange}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="image"
                    >
                        Image Url
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        value={image}
                        onChange={handleInputChange}
                        name="image"
                        type="url"
                        placeholder="Image Url"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="desc"
                    >
                        Short Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        maxLength={300}
                        id="desc"
                        name="desc"
                        type="text"
                        required
                        placeholder="Description"
                        value={desc}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <JoditEditorComponent
                        content={content}
                        setContent={handleContentChange}
                        config={config}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        disabled={loading}
                        className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {loading ? "please wait ..." : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormComponent;
