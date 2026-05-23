export default {
    darkMode: 'class',
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
theme: {
    extend: {
        colors: {
            brand: {
                700: '#1a1a1a', 
                900: '#0a0a0a',
            }
        }
    },
},
    plugins: [
        require('flowbite/plugin')
    ],
}