/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: '#F76B56',
          secondary: '#3B82F6',
          background: '#FFFFFF',
          foreground: '#111827',
          muted: '#F3F4F6',
          'muted-foreground': '#6B7280',
          input: '#E5E7EB',
          border: '#E5E7EB',
          destructive: '#EF4444',
        },
      },
    },
    plugins: [],
  };
  