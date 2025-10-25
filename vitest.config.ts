import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.tsx',
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'], // Only run tests in src/
    exclude: ['node_modules', 'e2e'], // Exclude e2e directory
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'vitest.setup.tsx',
        '**/*.config.{ts,js}',
        '**/types/**',
        '**/*.d.ts',
        'e2e/**', // Exclude e2e from coverage
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})