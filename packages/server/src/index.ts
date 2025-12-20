import { Elysia } from 'elysia';
import { auth, getBetterAuthOpenAPISchema } from './auth';
import { openapi } from '@elysiajs/openapi';
import { s3 } from 'bun';

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
	.get('/upload-url', () => {
		let name = Bun.randomUUIDv7();

		let upload = s3.presign(name, {
			method: 'PUT',
			type: 'application/octet-stream',
		});

		return upload;
	})
	.listen(3000);

console.log(
	`SafePup is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type SafePupAPI = typeof app;
