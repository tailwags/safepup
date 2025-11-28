import { createAuthClient } from 'better-auth/solid';
export const { signIn, signUp, useSession } = createAuthClient({
	baseURL: 'http://localhost:3000/api/v1/',
});
