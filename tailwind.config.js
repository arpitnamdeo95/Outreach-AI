/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    900: '#0f172a',
                    950: '#020617', // Deep Space
                    800: '#1e293b',
                    700: '#334155',
                },
                blue: {
                    500: '#3b82f6',
                    600: '#2563eb',
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                },
                neon: {
                    blue: '#2dd4bf',
                    purple: '#d946ef',
                    green: '#4ade80',
                },
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
