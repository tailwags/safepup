import { defineConfig } from 'tsdown';
import solid from 'unplugin-solid/rolldown';

// export both js and jsx
export default defineConfig([
	{
		platform: 'neutral',
		// use the solid plugin to handle jsx
		plugins: [solid()],
	},
	{
		platform: 'neutral',
		outExtensions: () => ({ js: '.jsx' }),
	},
]);
