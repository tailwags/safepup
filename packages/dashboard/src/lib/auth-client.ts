import { createAuthClient } from 'better-auth/solid';

const auth = createAuthClient({
	baseURL: 'http://localhost:3000/api/v1/auth',
});

export type ActiveSession = typeof auth.$Infer.Session;
export const { getSession, useSession, signUp, signIn, signOut } = auth;
