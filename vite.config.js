import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Multi-page app — lets Vite resolve /404 to 404.html
  appType: 'mpa',

  // Development server configuration
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  build: {
    rollupOptions: {
      input: {
        main:               resolve(__dirname, 'index.html'),
        about:              resolve(__dirname, 'about.html'),
        register:           resolve(__dirname, 'register.html'),
        schedule:           resolve(__dirname, 'schedule.html'),
        winners:            resolve(__dirname, 'winners.html'),
        sponsors:           resolve(__dirname, 'sponsors.html'),
        ourTeam:            resolve(__dirname, 'our-team.html'),
        codeOfConduct:      resolve(__dirname, 'code-of-conduct.html'),
        problemStatement:   resolve(__dirname, 'problem-statement.html'),
        notFound:           resolve(__dirname, '404.html'),
      },
      // mobile-perf.js is a legacy (non-module) script served statically
      external: ['/mobile-perf.js'],
    },
  },
});
