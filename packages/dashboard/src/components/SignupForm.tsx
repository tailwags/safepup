import type { Component } from 'solid-js';
import { createForm } from '@tanstack/solid-form';
import { signUp } from '@/lib/auth-client';

const Signup: Component = () => {
	const form = createForm(() => ({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		onSubmit: async ({ value }) => {
			await signUp.email({
				name: value.name,
				email: value.email,
				password: value.password,
				callbackURL: '/',
			});
		},
	}));

	return (
		<div class="card bg-base-100 w-full max-w-md shadow-xl">
			<div class="card-body">
				<h2 class="card-title text-2xl font-bold mb-4">Create Account</h2>
				<p class="text-base-content/70 mb-6">
					Sign up to get started with SafePup
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
							name="name"
							children={(field) => (
								<>
									<label class="label">
										<span class="label-text font-medium">Full Name</span>
									</label>
									<input
										type="text"
										placeholder="John Doe"
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
					</div>

					<div class="w-full mt-4">
						<form.Field
							name="confirmPassword"
							children={(field) => (
								<>
									<label class="label">
										<span class="label-text font-medium">Confirm Password</span>
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
					</div>

					<div class="form-control mt-6">
						<label class="label cursor-pointer justify-start gap-3">
							<input type="checkbox" class="checkbox checkbox-primary" />
							<span class="label-text">
								I agree to the{' '}
								<a href="#" class="link link-primary">
									Terms of Service
								</a>{' '}
								and{' '}
								<a href="#" class="link link-primary">
									Privacy Policy
								</a>
							</span>
						</label>
					</div>

					<div class="mt-6">
						<button type="submit" class="btn btn-primary w-full">
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
