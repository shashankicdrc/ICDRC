'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { RiParagraph } from "react-icons/ri";
import { BsTypeH1 } from "react-icons/bs";
import { BsTypeH2 } from "react-icons/bs";
import { BsTypeH3 } from "react-icons/bs";
import { BsTypeH4 } from "react-icons/bs";
import { BsTypeH5 } from "react-icons/bs";
import { BsTypeH6 } from "react-icons/bs";
import { GoListOrdered } from "react-icons/go";
import { GrBlockQuote } from "react-icons/gr";
import { MdInsertPageBreak } from "react-icons/md";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";



const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
   
    content: '<p>Start writing blog....</p>',
  })

  if(!editor){
    return null
  }



  return (

    <>

<div className='border-2 p-2 font-semibold shadow-md flex justify-start flex-wrap'>
<FaBold
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        bold
      </FaBold>
      <FaItalic
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        italic
      </FaItalic>
      
      <FaCode
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        code
      </FaCode>
     
      <RiParagraph
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        paragraph
      </RiParagraph>
      <BsTypeH1
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        h1
      </BsTypeH1>
      <BsTypeH2
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        h2
      </BsTypeH2>
      <BsTypeH3
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        h3
      </BsTypeH3>
      <BsTypeH4
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        h4
      </BsTypeH4>
      <BsTypeH5
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        h5
      </BsTypeH5>
      <BsTypeH6
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        h6
      </BsTypeH6>
      
      <GoListOrdered
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        ordered list
      </GoListOrdered>
      
      <GrBlockQuote
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        blockquote
      </GrBlockQuote>
      
      <MdInsertPageBreak onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </MdInsertPageBreak>
      <FaUndoAlt
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className={editor.isActive('blockquote') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        undo
      </FaUndoAlt>
      <FaRedo
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className={editor.isActive('blockquote') ? 'is-active' : "ml-2 border-2 text-xl "}
      >
        redo
      </FaRedo>
     
          </div>
   
    <EditorContent editor={editor} className='border shadow-sm' />


    </>
  )
}

export default Tiptap