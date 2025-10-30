import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'devops-sre-portfolio-game';

// Automatically detect environment
export default defineConfig(() => {
  // Detect local serve or preview
  const isLocal = process.env.VITE_PREVIEW === 'true';

  return {
    plugins: [react()],
    base: isLocal ? './' : `/${repoName}/`,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});
