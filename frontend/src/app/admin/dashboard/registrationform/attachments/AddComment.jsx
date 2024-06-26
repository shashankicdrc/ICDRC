
// components/AddComment.jsx
import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const AddComment = ({ onAddComment }) => {
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddComment({ email, text });
        setEmail('');
        setText('');
    };

    return (

        <form onSubmit={handleSubmit} className="flex items-center space-x-4 py-4 border-t border-gray-200 bg-white px-4">
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
    );
};

export default AddComment;
