import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inertiaPages } from '@hono/inertia/vite';
import devServer from '@hono/vite-dev-server';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import ssrPlugin from 'vite-ssr-components/plugin';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    inertiaPages({
      pagesDir: 'app/pages',
      outFile: 'app/pages.gen.ts',
      serverModule: './server',
    }),
    react(),
    devServer({
      entry: 'app/server.tsx',
    }),
    ssrPlugin(),
  ],
});
