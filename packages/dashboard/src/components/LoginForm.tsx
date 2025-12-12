import type { Component } from 'solid-js';
import { createForm } from '@tanstack/solid-form';
import { signIn } from '@/lib/auth-client';
import AuthForm from '@/components/AuthForm';

const Login: Component = () => {
	const form = createForm(() => ({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			await signIn.email({
				email: value.email,
				password: value.password,
				callbackURL: '/',
			});
		},
	}));

	return (
		<AuthForm
			title="Welcome Back"
			description="Sign in to your account to continue"
			footerText="Don't have an account?"
			footerLinkText="Sign up"
			footerLinkHref="/signup"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div class="w-full">
					<form.Field
						name="email"
						children={(field) => (
							<>
								<label class="label">
									<span class="label-text font-medium">Email</span>
								</label>
								<input
									type="email"
									placeholder="you@example.com"
									class="input input-bordered w-full"
									name={field().name}
									value={field().state.value}
									onBlur={field().handleBlur}
									onInput={(e) => field().handleChange(e.target.value)}
								/>
							</>
						)}
					/>
				</div>

				<div class=" w-full mt-4">
					<form.Field
						name="password"
						children={(field) => (
							<>
								<label class="label">
									<span class="label-text font-medium">Password</span>
								</label>
								<input
									type="password"
									placeholder="••••••••"
									class="input input-bordered w-full"
									name={field().name}
									value={field().state.value}
									onBlur={field().handleBlur}
									onInput={(e) => field().handleChange(e.target.value)}
								/>
							</>
						)}
					/>
					<label class="label">
						<span class="label-text-alt"></span>
						<a href="#" class="label-text-alt link link-hover link-primary">
							Forgot password?
						</a>
					</label>
				</div>

				<div class="mt-6">
					<button type="submit" class="btn btn-primary w-full">
						Sign In
					</button>
				</div>
			</form>
		</AuthForm>
	);
};

export default Login;
