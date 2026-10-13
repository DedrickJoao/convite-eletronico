import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'couple-photos-uploader',
        configureServer(server) {
          server.middlewares.use('/api/upload-photo', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const { slotIndex, dataUrl, filename } = data;
                
                if (typeof slotIndex !== 'number' || !dataUrl) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Parâmetros inválidos' }));
                  return;
                }

                // Extract base64
                const matches = dataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                if (!matches || matches.length !== 3) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Formato de imagem inválido' }));
                  return;
                }

                const ext = matches[1].includes('png') ? 'png' : 'jpg';
                const buffer = Buffer.from(matches[2], 'base64');
                const outName = `couple_photo_${slotIndex + 1}.${ext}`;
                const outDir = path.resolve(process.cwd(), 'public/uploads');

                if (!fs.existsSync(outDir)) {
                  fs.mkdirSync(outDir, { recursive: true });
                }

                fs.writeFileSync(path.join(outDir, outName), buffer);

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  url: `/uploads/${outName}?t=${Date.now()}`,
                  filename: filename || outName,
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
