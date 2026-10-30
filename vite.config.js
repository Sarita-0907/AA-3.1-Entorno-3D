import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// En GitHub Pages, cada repositorio de proyecto usa /NOMBRE-DEL-REPO/.
// Esta configuración detecta el nombre al construir con GitHub Actions.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite = repository?.toLowerCase().endsWith('.github.io');
const base = repository && !isUserSite ? `/${repository}/` : '/';

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        index: resolve('index.html'),
        semaforo: resolve('semaforo.html'),
        corazon: resolve('corazon.html'),
      },
    },
  },
});
