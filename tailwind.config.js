/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DXVK Studio brand colors - Dark volcanic theme
        studio: {
          950: '#0a0a0b',  // Deepest background
          900: '#111113',  // Main background
          850: '#18181b',  // Card background
          800: '#1f1f23',  // Elevated surfaces
          700: '#27272a',  // Borders
          600: '#3f3f46',  // Muted text
          500: '#71717a',  // Secondary text
          400: '#a1a1aa',  // Primary text
          300: '#d4d4d8',  // Headings
          200: '#e4e4e7',  // Bright text
          100: '#fafafa',  // White text
        },
        accent: {
          vulkan: '#ac2a29',   // DXVK red (Vulkan brand color)
          glow: '#ff4136',     // Lighter glow
          success: '#10b981',  // Green for success states
          warning: '#f59e0b',  // Amber for warnings
          danger: '#ef4444',   // Red for errors
          info: '#3b82f6',     // Blue for info
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(172, 42, 41, 0.3)',
        'glow-lg': '0 0 40px rgba(172, 42, 41, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
