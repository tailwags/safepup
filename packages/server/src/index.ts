import { Elysia } from 'elysia';
import { auth, BetterAuthOpenAPI } from './auth';
import { openapi, fromTypes } from '@elysiajs/openapi';

export const app = new Elysia({ prefix: '/api/v1' })
	.use(
		openapi({
			references: fromTypes(),
			documentation: {
				components: await BetterAuthOpenAPI.components,
				paths: await BetterAuthOpenAPI.getPaths('/api/v1/auth'),
			},
			provider: null,
			specPath: '/openapi.json',
		}),
	)
	.mount(auth.handler)
	.listen(3000);

console.log(
	`SafePup is running at ${app.server?.hostname}:${app.server?.port}`,
);
