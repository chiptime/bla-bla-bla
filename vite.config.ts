import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://chiptime.github.io/bla-bla-bla', // Link page
  plugins: [preact()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@ioc': path.resolve(__dirname, './src/inversify'),
			'@apps': path.resolve(__dirname, './src/apps'),
			'@shared': path.resolve(__dirname, './src/apps/Shared'),
			'@contexts': path.resolve(__dirname, './src/Contexts'),
			'@theme': path.resolve(__dirname, './src/apps/Shared/Theme'),
			'@assets': path.resolve(__dirname, './src/assets'),
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			tsconfigRaw: {
				compilerOptions: {
					experimentalDecorators: true,
				},
			},
		},
	},
	build: {
		sourcemap: true,
	},
})
