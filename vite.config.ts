import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		base: env.VITE_BASE_PATH || '/',
		server: {
			port: 3000,
		},
		build: {
			sourcemap: true,
			rollupOptions: {
				onwarn: (warning, warn) => {
					warn(warning);
				},
			},
		},
		plugins: [react(), tsconfigPaths(), svgr()],
		resolve: {
			alias: {
				'@scss': path.resolve(__dirname, './src/shared/scss/'),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
	};
});
