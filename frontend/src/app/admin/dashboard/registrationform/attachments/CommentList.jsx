import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, lastMessageRef }) => {
    return (
        <div className="space-y-2 overflow-y-auto">
            {!comments.length ? (
                <p className="font-bold text-xl text-center">No comment is exist.</p>
            ) : (
                comments.map((comment, index) => (
                    <div
                        key={comment._id}
                        className={`flex w-max max-w-md md:max-w-lg flex-col gap-2 rounded-md text-sm ${comment.authorType === 'icdrc'
                            ? 'ml-auto'
                            : ''}`
                        }
                    >
                        <Comment key={comment.id} comment={comment} />
                        {index === comments.length - 1 && <div ref={lastMessageRef} />}
                    </div>
                ))
            )}
        </div>);
};

export default CommentList;
