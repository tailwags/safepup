import { Elysia } from 'elysia';
import { auth, getBetterAuthOpenAPISchema } from './auth';
import { openapi } from '@elysiajs/openapi';

export const app = new Elysia({ prefix: '/api/v1' })
	.use(
		getBetterAuthOpenAPISchema('/api/v1/auth').then(({ components, paths }) =>
			openapi({
				documentation: {
					info: {
						title: 'SafePup Documentation',
						version: '1',
					},
					paths,
					components,
				},
				provider: null,
				specPath: '/openapi.json',
			}),
		),
	)
	.mount(auth.handler)
	.listen(3000);

console.log(
	`SafePup is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type SafePupAPI = typeof app;
