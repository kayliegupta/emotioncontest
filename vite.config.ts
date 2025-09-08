import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Set the root to your client-side code folder.
  // This is where Vite will look for your index.html and other source files.
  root: path.resolve(__dirname, 'src/client'),
  plugins: [
    react(),
    // This plugin will automatically generate and cache a self-signed certificate
    // to enable HTTPS for the local development server.
    basicSsl(),
  ],
  // We need to clear the outDir to prevent Vite from deleting the dist folder
  // on every build, which would interfere with the server build.
  build: {
    emptyOutDir: false,
  },
});