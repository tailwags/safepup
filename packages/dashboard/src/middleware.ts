import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/auth-client';

export const onRequest = defineMiddleware(async (context, next) => {
	const { data } = await getSession({
		fetchOptions: {
			headers: context.request.headers,
		},
	});

	if (data) {
		context.locals.session = data;
	} else {
		context.locals.session = null;
	}

	return next();
});
