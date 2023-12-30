import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['helvetic', 'system-ui'],
                serif: ['helvetic', 'Georgia'],
                mono: ['helvetic', 'SFMono-Regular'],
                Chalkduster: ['Chalk', 'cursive'],
                Helvetica: ['helvetic', 'Chalk'],
                Xingkai: ['Xingkai SC', 'cursive'],
            }
        },
    },
    darkMode: "class",
    plugins: [nextui()],
}

