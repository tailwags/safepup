import solidPlugin from 'unplugin-solid/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	root: './playground',
	plugins: [solidPlugin()],
});
