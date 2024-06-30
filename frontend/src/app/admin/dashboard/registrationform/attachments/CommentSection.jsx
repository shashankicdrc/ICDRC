'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react';
import CommentList from './CommentList';
import toast from 'react-hot-toast';
import { url } from '../../../../api';
import { MdAttachFile } from 'react-icons/md';
import { Input } from '@chakra-ui/react';
import AttachmentPreviewModal from '../../../../../components/CaseStatus/attachment/AttachmentpreviewModal'
import { createPortal } from 'react-dom';


const CommentSection = ({ placed, caseId, caseType, email }) => {
    const [comments, setComments] = useState([]);
    const [authorType, setauthorType] = useState('icdrc')
    const [authorName, setauthorName] = useState('ICDRC')
    const [text, setText] = useState('');
    const lastMessageRef = useRef()
    const [uploadedImages, setuploadedImages] = useState([]);
    const [attachmentPreviewModal, setAttachmentPreviewModal] = useState()
    const [attchementloading, setattchementloading] = useState(false);

    const updateMessage = (data) => {
        setComments((prevState) => [...prevState, data]);
    };

    useEffect(() => {
        if (placed !== 'dashboard') {
            setauthorName(email)
            setauthorType('user')
        }
    }, [placed, caseId, caseType])

    useEffect(() => {
        if (!lastMessageRef.current) return;
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [comments])

    useEffect(() => {
        async function fetchComment() {
            const response = await fetch(`${url}/api/comments?caseId=${caseId}&caseType=${caseType}`,
                {
                    cache: 'no-cache'
                }
            );
            const { data, error } = await response.json()
            if (error) return toast.error(error)
            setComments(data)
        }
        fetchComment()
    }, [])

    const handleAddComment = async (e) => {
        try {
            if (!text.length) return;
            e.preventDefault();
            const response = await fetch(`${url}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    authorType,
                    authorName,
                    caseId,
                    caseType,
                    text
                }),
            })

            const { data, error } = await response.json();
            if (error) return toast.error(error)
            setComments([...comments, data])
            setText('')
        } catch (error) {
            toast.error(error.message)
        }
    };

    const fileChangeHandler = (e) => {
        e.preventDefault();
        setAttachmentPreviewModal(true);
        const files = e.target.files;

        Array.from(files).forEach((file) => {
            const fileReader = new FileReader();

            fileReader.onloadstart = () => {
                setattchementloading(true);
            };

            fileReader.onloadend = () => {
                setattchementloading(false);
            };

            fileReader.onload = (event) => {
                setuploadedImages((prevState) => [
                    ...prevState,
                    {
                        image_as_file: file,
                        image_preview: {
                            url: event.target.result,
                            id: Date.now().toString(),
                        },
                    },
                ]);
            };
            fileReader.readAsDataURL(file);
            return fileReader;
        });
    };

    return (
        <Fragment>
            {attachmentPreviewModal ? (
                createPortal(<AttachmentPreviewModal
                    isImageloaded={attchementloading}
                    data={uploadedImages}
                    setuploadImages={setuploadedImages}
                    setmessages={updateMessage}
                    setModalOpen={setAttachmentPreviewModal}
                    type={placed === 'dashboard' ? 'admin' : 'user'}
                    id={caseId}
                />, document.body
                )) : null}
            <div className="flex-grow overflow-y-auto px-5 py-20" >
                <CommentList comments={comments} lastMessageRef={lastMessageRef} />
            </div>
            <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
                <form className="flex items-center space-x-4 py-4 px-4" onSubmit={handleAddComment}>
                    <div>
                        <input
                            onChange={fileChangeHandler}
                            type="file"
                            className="hidden"
                            id="attachment"
                            multiple
                            accept="image/*, video/*,.doc,.docx,application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                        />
                        <label htmlFor="attachment" className="rounded-full h-10 w-10 cursor-pointer">
                            <MdAttachFile size={20} />
                        </label>
                    </div>
                    <Input
                        type="text"
                        placeholder="Your comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                        required
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
                        Add Comment
                    </button>
                </form>
            </div>
        </Fragment>

    );
};

export default CommentSection;
