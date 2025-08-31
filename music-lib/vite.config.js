import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
        './MusicLibrary': './src/MusicLibrary',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5001, // or any port
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',   // ✅ fix CORS
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  },
  server: {
    port: 5001,
    strictPort: true,
    cors: true, // ✅ enables CORS in dev mode
  },
});
