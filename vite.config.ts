import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// Plugin simples para mockar a API
const mockApiPlugin = () => ({
  name: 'mock-api',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (!req.url?.startsWith('/api/')) {
        return next();
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
      }

      // Mock responses based on path and method
      if (req.url.match(/^\/api\/products\/?(\?.*)?$/)) {
        if (req.method === 'GET') {
          return res.end(JSON.stringify([
            { id: 1, name: 'Smartphone XYZ', price: 1999.99, description: 'Um smartphone avançado com 128GB de armazenamento.', categoryId: 2 },
            { id: 2, name: 'Notebook Pro', price: 4500.00, description: 'Notebook para uso profissional.', categoryId: 1 }
          ]));
        }
        if (req.method === 'POST') {
          res.statusCode = 201;
          return res.end(JSON.stringify({ id: 3, name: 'Novo Produto', price: 99.99, description: 'Descrição do novo produto', categoryId: 1 }));
        }
      }

      const productMatch = req.url.match(/^\/api\/products\/(\d+)$/);
      if (productMatch) {
        const id = parseInt(productMatch[1]);
        if (req.method === 'GET') {
          return res.end(JSON.stringify({ id, name: 'Smartphone XYZ', price: 1999.99, description: 'Um smartphone avançado com 128GB de armazenamento.', categoryId: 2 }));
        }
        if (req.method === 'PUT') {
          return res.end(JSON.stringify({ id, name: 'Produto Atualizado', price: 2099.99, description: 'Descrição atualizada', categoryId: 2 }));
        }
        if (req.method === 'DELETE') {
          res.statusCode = 204;
          return res.end();
        }
      }

      if (req.url.match(/^\/api\/categories\/?(\?.*)?$/) && req.method === 'GET') {
        return res.end(JSON.stringify([
          { id: 1, name: 'Informática' },
          { id: 2, name: 'Eletrônicos' }
        ]));
      }

      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not found' }));
    });
  }
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), mockApiPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
