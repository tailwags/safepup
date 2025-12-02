import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import { db } from './db';
import { redis } from 'bun';

export const auth = betterAuth({
	basePath: '/auth',
	trustedOrigins: ['http://localhost:4321'],
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
			strategy: 'jwe',
		},
	},
	secondaryStorage: {
		get: (key) => redis.get(key),
		set: (key, value, ttl) =>
			ttl ? redis.set(key, value, 'EX', ttl) : redis.set(key, value),
		delete: (key) => void redis.del(key),
	},
	emailAndPassword: {
		enabled: true,
		password: {
			hash: Bun.password.hash,
			verify: ({ hash, password }) => Bun.password.verify(password, hash),
		},
	},
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),
	advanced: {
		database: {
			generateId: 'uuid',
		},
	},
	experimental: { joins: true },
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
