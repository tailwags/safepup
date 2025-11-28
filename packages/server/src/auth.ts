import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import { db } from './db';

export const auth = betterAuth({
	basePath: '/auth',
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),
	plugins: [openAPI()],
});

export const getBetterAuthOpenAPISchema = (prefix: string) => {
	return auth.api.generateOpenAPISchema().then(({ paths, components }) => {
		const reference: typeof paths = Object.create(null);

		for (const path of Object.keys(paths)) {
			const key = prefix + path;
			reference[key] = paths[path]!;

			for (const method of Object.keys(paths[path]!)) {
				const operation = (reference[key] as any)[method];

				operation.tags = ['Auth'];
			}
		}

		return {
			components: components as any,
			paths: reference as any,
		};
	});
};
