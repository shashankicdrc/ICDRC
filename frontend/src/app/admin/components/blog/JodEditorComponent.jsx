'use client'
import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const JoditEditorComponent = React.memo(({ content, setContent, config }) => {
    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            config={config}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => { }}
        />
    );
});

export default JoditEditorComponent
