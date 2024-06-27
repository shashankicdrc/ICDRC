'use client'
import React, { useEffect, useRef, useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import toast from 'react-hot-toast';
import { url } from '../../../../api';

const CommentSection = ({ placed, caseId, caseType, email }) => {
    const [comments, setComments] = useState([]);
    const [authorType, setauthorType] = useState('icdrc')
    const [authorName, setauthorName] = useState('ICDRC')
    const lastMessageRef = useRef()
    const commentSectionRef = useRef();

    useEffect(() => {
        if (placed !== 'dashboard') {
            setauthorName(email)
            setauthorType('user')
        }
    }, [placed, caseId, caseType])

    useEffect(() => {
        if (!lastMessageRef.current || !commentSectionRef.current) return;
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
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

    const handleAddComment = async (comment) => {
        try {
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
                    text: comment.text,
                }),
            })

            const { data, error } = await response.json();
            if (error) return toast.error(error)
            setComments([...comments, data])
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div ref={commentSectionRef} className="mx-auto px-5 pt-4 min-h-72 border rounded-lg shadow-md relative bg-white h-full">
            <div className="pb-20 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                <CommentList comments={comments} lastMessageRef={lastMessageRef} />
            </div>
            <div className="absolute bottom-0 w-full left-0">
                <AddComment onAddComment={handleAddComment} />
            </div>
        </div>);
};

export default CommentSection;
