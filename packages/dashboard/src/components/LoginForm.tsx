import type { Component } from 'solid-js';
import { createForm } from '@tanstack/solid-form';
import { signIn } from '@/lib/auth-client';

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
		<div class="card bg-base-100 w-full max-w-md shadow-xl">
			<div class="card-body">
				<h2 class="card-title text-2xl font-bold mb-4">Welcome Back</h2>
				<p class="text-base-content/70 mb-6">
					Sign in to your account to continue
				</p>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div class="form-control w-full">
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

					<div class="form-control w-full mt-4">
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
			</div>
		</div>
	);
};

export default Login;
