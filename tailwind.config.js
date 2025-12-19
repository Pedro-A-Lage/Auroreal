/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html",
        "./Components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#F8F6F3',
                primary: {
                    DEFAULT: '#662D91',
                    50: '#F5F3F7',
                    100: '#E9E4F0',
                    200: '#D3C9E0',
                    300: '#BDAED1',
                    400: '#A793C1',
                    500: '#662D91',
                    600: '#502274',
                    700: '#3D1A57',
                    800: '#29123A',
                    900: '#160A1D',
                },
                accent: {
                    DEFAULT: '#f7941d',
                    50: '#FFF8ED',
                    100: '#FFF0D6',
                    200: '#FFDEAD',
                    300: '#FFCB85',
                    400: '#FFB95C',
                    500: '#f7941d',
                    600: '#d67d14',
                    700: '#A85F0F',
                    800: '#7A440B',
                    900: '#4D2A07',
                },
                success: {
                    DEFAULT: '#10B981',
                    light: '#D1FAE5',
                    dark: '#065F46',
                },
                error: {
                    DEFAULT: '#EF4444',
                    light: '#FEE2E2',
                    dark: '#991B1B',
                },
                warning: {
                    DEFAULT: '#F59E0B',
                    light: '#FEF3C7',
                    dark: '#92400E',
                },
                info: {
                    DEFAULT: '#3B82F6',
                    light: '#DBEAFE',
                    dark: '#1E40AF',
                },
                muted: '#6B6B6B',
            },
            fontFamily: {
                sans: ['"Inter"', 'system-ui', 'sans-serif'],
                display: ['"Inter"', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
                'display-md': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
                'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
                '42': '10.5rem',
                '128': '32rem',
                '144': '36rem',
                'section-sm': '4rem',
                'section-md': '6rem',
                'section-lg': '8rem',
                'section-xl': '12rem',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.06)',
                'premium': '0 8px 32px rgba(102, 45, 145, 0.08)',
                'premium-lg': '0 16px 48px rgba(102, 45, 145, 0.12)',
                'glow-accent': '0 0 24px rgba(247, 148, 29, 0.3)',
                'glow-primary': '0 0 24px rgba(102, 45, 145, 0.3)',
                'inner-subtle': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-down': {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-4px)' },
                    '75%': { transform: 'translateX(4px)' },
                },
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.6s ease-out',
                'fade-in-down': 'fade-in-down 0.6s ease-out',
                'scale-in': 'scale-in 0.5s ease-out',
                'shimmer': 'shimmer 2s linear infinite',
                'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
                'shake': 'shake 0.3s ease-in-out',
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1507842217121-9e9f1479fb48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }
        },
    },
    plugins: [],
}
