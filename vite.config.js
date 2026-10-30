import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        festejo: resolve(__dirname, 'festejo.html'),
        capoeira: resolve(__dirname, 'capoeira.html'),
        agenda: resolve(__dirname, 'agenda.html'),
        horarios: resolve(__dirname, 'horarios.html'),
        ministerios: resolve(__dirname, 'ministerios.html'),
        galeria: resolve(__dirname, 'galeria.html'),
        contato: resolve(__dirname, 'contato.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});

