import { defineConfig } from 'tsdown';
import solid from 'unplugin-solid/rolldown';

// export both js and jsx
export default defineConfig([
	{
		// use the solid plugin to handle jsx
		plugins: [solid()],
	},
	{
		// preserve jsx in the output
		inputOptions(options) {
			options.transform = {
				...options.transform,
				jsx: 'preserve',
			};
		},
		outExtensions: () => ({ js: '.jsx' }),
	},
]);
