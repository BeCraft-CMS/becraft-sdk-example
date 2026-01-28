import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [tsConfigPaths(), tanstackStart(), react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
});
