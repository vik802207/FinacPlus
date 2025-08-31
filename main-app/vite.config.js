import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app',
      remotes: {
        remoteApp: 'https://delicate-melba-96ba47.netlify.app/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
   server: {
    port: 5001,
    cors: true, // ✅ enables CORS
    headers: {
      "Access-Control-Allow-Origin": "*",  // ✅ allow all origins
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
