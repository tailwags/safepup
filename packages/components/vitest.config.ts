import { defineConfig } from 'vitest/config';
import solid from 'unplugin-solid/vite';

export default defineConfig({
	// @ts-expect-error vite error
	plugins: [solid()],
	test: {
		environment: 'happy-dom',
		globals: true,
		setupFiles: './tests/setup.ts',
	},
});
