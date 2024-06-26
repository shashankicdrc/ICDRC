
// components/CommentList.jsx
import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, lastMessageRef }) => {
    return (
        <div className="space-y-2 overflow-y-auto">
            {!comments.length ? <p className="font-bold text-xl text-center">No comment is exist.</p> :
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            <div ref={lastMessageRef} />
        </div>
    );
};

export default CommentList;
