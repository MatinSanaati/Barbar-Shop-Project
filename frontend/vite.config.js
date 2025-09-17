// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // ← این خط رو اضافه کن (ضروری برای SPA و روتینگ داخلی)
  server: {
    port: 3000,
    open: true,
  },
});