import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({ eslint: { lintCommand: 'eslint src' }, overlay: false }),
  ],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      service: '/src/service',
      wrapper: '/src/wrapper',
      pages: '/src/pages',
      layout: '/src/layout',
      assets: '/src/assets',
    },
  },
});
