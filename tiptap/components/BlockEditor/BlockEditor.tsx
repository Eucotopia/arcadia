'use client'

import {EditorContent, PureEditorContent} from '@tiptap/react'
import React, {useRef} from 'react'

import {LinkMenu} from '@/tiptap/components/menus'

import {useBlockEditor} from '@/tiptap/hooks/useBlockEditor'


import '@/tiptap/styles/index.css'

import {Sidebar} from '@/tiptap/components/Sidebar'
import ImageBlockMenu from '@/tiptap/extensions/ImageBlock/components/ImageBlockMenu'
import {ColumnsMenu} from '@/tiptap/extensions/MultiColumn/menus'
import {TableColumnMenu, TableRowMenu} from '@/tiptap/extensions/Table/menus'
import {EditorHeader} from './components/EditorHeader'
import {TextMenu} from '../menus/TextMenu'
import {ContentItemMenu} from '../menus/ContentItemMenu'

export const BlockEditor = () => {
    const menuContainerRef = useRef(null)

    const {editor, characterCount, leftSidebar} = useBlockEditor()


    if (!editor) {
        return null
    }

    return (
        <div className="flex max-h-full]" ref={menuContainerRef}>
            <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor}/>
            <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                <EditorHeader
                    characters={characterCount.characters()}
                    words={characterCount.words()}
                    isSidebarOpen={leftSidebar.isOpen}
                    toggleSidebar={leftSidebar.toggle}
                />
                <EditorContent editor={editor} className="flex-1 overflow-y-auto"/>
                <ContentItemMenu editor={editor}/>
                <LinkMenu editor={editor} appendTo={menuContainerRef}/>
                <TextMenu editor={editor}/>
                <ColumnsMenu editor={editor} appendTo={menuContainerRef}/>
                <TableRowMenu editor={editor} appendTo={menuContainerRef}/>
                <TableColumnMenu editor={editor} appendTo={menuContainerRef}/>
                <ImageBlockMenu editor={editor} appendTo={menuContainerRef}/>
            </div>
        </div>
    )
}

export default BlockEditor
