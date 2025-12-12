import { type ParentComponent } from 'solid-js';

interface AuthFormProps {
	title: string;
	description: string;
	footerText: string;
	footerLinkText: string;
	footerLinkHref: string;
}

const AuthForm: ParentComponent<AuthFormProps> = (props) => {
	return (
		<div class="flex min-h-screen items-center justify-center p-4">
			<div class="w-full max-w-md">
				<div class="card bg-neutral w-full max-w-md shadow-xl">
					<div class="card-body">
						<h2 class="card-title text-2xl font-bold">{props.title}</h2>
						<p class="text-base-content/70 mb-4">{props.description}</p>
						{props.children}
					</div>
				</div>

				<div class="text-base-content/70 mt-6 text-center text-sm">
					<span>{props.footerText} </span>
					<a class="link link-primary font-medium" href={props.footerLinkHref}>
						{props.footerLinkText}
					</a>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
