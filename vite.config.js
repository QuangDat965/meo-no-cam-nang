import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    allowedHosts: ['coaches-advice-each-valve.trycloudflare.com'],
  },
});
