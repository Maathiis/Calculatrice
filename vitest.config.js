import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    exclude: [
      'node_modules', // Exclut les tests des dépendances
      'tests/e2e/**', // Exclut les tests Playwright
    ],
  },
});
