import {useEditor} from '@tiptap/react'

import {ExtensionKit} from '@/tiptap/extensions/extension-kit'
import {useSidebar} from './useSidebar'

export const useBlockEditor = () => {
    const leftSidebar = useSidebar()

    const editor = useEditor(
        {
            autofocus: true,
            extensions: [
                ...ExtensionKit(),
            ],
            editorProps: {
                attributes: {
                    autocomplete: 'off',
                    autocorrect: 'off',
                    autocapitalize: 'off',
                    class: 'min-h-full',
                },
            },
        },
    )


    const characterCount = editor?.storage.characterCount || {characters: () => 0, words: () => 0}

    window.editor = editor

    return {editor, characterCount, leftSidebar}
}
