import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs(), vue()],
	vite: {
		// @ts-expect-error needs astro v6
		plugins: [tailwindcss()],
	},
});
