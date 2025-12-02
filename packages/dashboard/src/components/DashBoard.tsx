import { signOut, useSession, type ActiveSession } from '@/lib/auth-client';
import { createEffect, createSignal, type Component } from 'solid-js';

export interface DashBoardProps {
	initialSession: ActiveSession;
}

const DashBoard: Component<DashBoardProps> = (props) => {
	const [session, setSession] = createSignal(props.initialSession);

	const sessionProvider = useSession();

	createEffect(() => {
		const data = sessionProvider().data;
		if (data) {
			setSession(data);
		}
	});

	const handleSignOut = async () => {
		await signOut();
		window.location.reload();
	};

	return (
		<div class="bg-base-200 flex flex-col min-h-screen items-center justify-center p-4">
			<div>{session().user.name}</div>
			<button class="btn btn-primary" onClick={handleSignOut}>
				Sign out
			</button>
		</div>
	);
};

export default DashBoard;
